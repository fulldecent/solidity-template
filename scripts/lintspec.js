import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, createWriteStream, existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const version = "0.20.0";

const targets = {
  "darwin-arm64": {
    file: "lintspec-aarch64-apple-darwin.tar.xz",
    sha256: "82d6aa573765ee307865b8854e9f4fc41365c13e09e814c983ee7808d19aa6c2",
  },
  "linux-arm64": {
    file: "lintspec-aarch64-unknown-linux-gnu.tar.xz",
    sha256: "a3aba8c92ca617d34786811578de8663700759d115e40e4e582b8b8c0fa8e408",
  },
  "linux-x64": {
    file: "lintspec-x86_64-unknown-linux-gnu.tar.xz",
    sha256: "9eb83611cfefe248f74dd1e93fae2b246fd56ea2b9fc6445a126bb1c0314c0ae",
  },
  "win32-x64": {
    file: "lintspec-x86_64-pc-windows-msvc.zip",
    sha256: "e4691068df0ec1a6a526b9231aa8b33e9752bdad43aa7c9b2c4326c5de5fc699",
  },
};

const key = `${process.platform}-${process.arch}`;
const target = targets[key];
if (!target) {
  console.error(`lintspec ${version} has no binary for ${key}`);
  process.exit(1);
}

const root = path.join(homedir(), ".cache", "lintspec", version, key);
const binaryName = process.platform === "win32" ? "lintspec.exe" : "lintspec";

function findBinary(dir) {
  if (!existsSync(dir)) {
    return undefined;
  }
  const direct = path.join(dir, binaryName);
  if (existsSync(direct)) {
    return direct;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const nested = path.join(dir, entry.name, binaryName);
    if (existsSync(nested)) {
      return nested;
    }
  }
  return undefined;
}

if (!findBinary(root)) {
  mkdirSync(root, { recursive: true });
  const archive = path.join(root, target.file);
  const url = `https://github.com/beeb/lintspec/releases/download/v${version}/${target.file}`;
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    console.error(`Failed to download ${url}: ${response.status}`);
    process.exit(1);
  }
  await pipeline(response.body, createWriteStream(archive));
  const digest = createHash("sha256").update(readFileSync(archive)).digest("hex");
  if (digest !== target.sha256) {
    console.error(`Checksum mismatch for ${target.file}`);
    process.exit(1);
  }
  const extracted = spawnSync("tar", ["-xf", archive, "-C", root], { stdio: "inherit" });
  if ((extracted.status ?? 1) !== 0 || !findBinary(root)) {
    console.error(`lintspec binary was not found in ${target.file}`);
    process.exit(extracted.status ?? 1);
  }
  chmodSync(findBinary(root), 0o755);
}

const result = spawnSync(findBinary(root), process.argv.slice(2), { stdio: "inherit" });
process.exit(result.status ?? 1);
