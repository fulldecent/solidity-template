import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("Mutex contract", async function () {
  const { viem, networkHelpers } = await network.create();

  async function deployMutex() {
    const mutex = await viem.deployContract("Mutex");
    return { mutex };
  }

  it("starts unlocked", async function () {
    const { mutex } = await networkHelpers.loadFixture(deployMutex);
    assert.equal(await mutex.read.locked(), false);
  });

  it("locks and then unlocks", async function () {
    const { mutex } = await networkHelpers.loadFixture(deployMutex);

    await viem.assertions.emit(mutex.write.lock(), mutex, "Locked");
    assert.equal(await mutex.read.locked(), true);

    await viem.assertions.emit(mutex.write.unlock(), mutex, "Unlocked");
    assert.equal(await mutex.read.locked(), false);
  });

  it("reverts when locking an already locked mutex", async function () {
    const { mutex } = await networkHelpers.loadFixture(deployMutex);
    await mutex.write.lock();
    await viem.assertions.revertWithCustomError(mutex.write.lock(), mutex, "AlreadyLocked");
    assert.equal(await mutex.read.locked(), true);
  });

  it("reverts when unlocking an already unlocked mutex", async function () {
    const { mutex } = await networkHelpers.loadFixture(deployMutex);
    await viem.assertions.revertWithCustomError(mutex.write.unlock(), mutex, "AlreadyUnlocked");
    assert.equal(await mutex.read.locked(), false);
  });
});
