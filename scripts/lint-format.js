import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const prettier = require.resolve("prettier/bin/prettier.cjs");
const markdownlint = require.resolve("markdownlint-cli/markdownlint.js");

const [command, ...paths] = process.argv.slice(2);

function run(script, args) {
  const result = spawnSync(process.execPath, [script, ...args], {
    stdio: "inherit",
  });
  if (result.error) {
    console.error(result.error.message);
    return 1;
  }
  return result.status ?? 1;
}

// tinyglobby treats these as syntax. A directory named docs/[draft] must not
// become a character class.
function escapeGlob(segment) {
  return segment.replace(/[\\?*+[\]{}()!@]/g, "\\$&");
}

function markdownPaths(input) {
  if (input.length === 0) {
    return ["**/*.md"];
  }

  const targets = [];
  for (const item of input) {
    let stat;
    try {
      stat = fs.statSync(item);
    } catch {
      stat = undefined;
    }
    if (stat?.isDirectory()) {
      const normalized = item.split(path.sep).join("/").replace(/\/$/, "");
      const escaped = normalized.split("/").map(escapeGlob).join("/");
      targets.push(`${escaped}/**/*.md`);
      continue;
    }
    if (item.endsWith(".md")) {
      targets.push(item);
    }
  }
  return targets;
}

const commands = new Set(["lint", "format", "lint:prettier", "lint:markdown", "format:prettier", "format:markdown"]);

if (!commands.has(command)) {
  console.error(
    "usage: lint-format.js lint|format|lint:prettier|lint:markdown|format:prettier|format:markdown [paths]",
  );
  process.exit(1);
}

const write = command.startsWith("format");
let status = 0;

if (command.endsWith("prettier") || command === "lint" || command === "format") {
  const code = run(prettier, [write ? "--write" : "--check", ...(paths.length === 0 ? ["."] : paths)]);
  if (status === 0) {
    status = code;
  }
}

if (command.endsWith("markdown") || command === "lint" || command === "format") {
  const targets = markdownPaths(paths);
  if (targets.length > 0) {
    const code = run(markdownlint, [...(write ? ["--fix"] : []), ...targets]);
    if (status === 0) {
      status = code;
    }
  }
}

process.exit(status);
