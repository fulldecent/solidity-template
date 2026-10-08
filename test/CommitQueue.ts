import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("CommitQueue", async function () {
  const { viem, networkHelpers } = await network.create();

  async function deployQueue() {
    const [a, b, c] = await viem.getWalletClients();
    const queue = await viem.deployContract("CommitQueueMock");
    return { queue, a, b, c };
  }

  describe("putting in a then b then c", function () {
    async function enqueueThree() {
      const deployed = await deployQueue();
      await deployed.queue.write.enqueue([deployed.a.account.address, 1]);
      await deployed.queue.write.enqueue([deployed.b.account.address, 1]);
      await deployed.queue.write.enqueue([deployed.c.account.address, 1]);
      await networkHelpers.mine();
      return deployed;
    }

    it("gets a, then b, then c", async function () {
      const { queue, a, b, c } = await networkHelpers.loadFixture(enqueueThree);

      await viem.assertions.emitWithArgs(
        queue.write.dequeue(),
        queue,
        "DequeueReturn",
        [a.account.address, (maturity: bigint) => maturity > 0n],
      );
      await viem.assertions.emitWithArgs(
        queue.write.dequeue(),
        queue,
        "DequeueReturn",
        [b.account.address, (maturity: bigint) => maturity > 0n],
      );
      await viem.assertions.emitWithArgs(
        queue.write.dequeue(),
        queue,
        "DequeueReturn",
        [c.account.address, (maturity: bigint) => maturity > 0n],
      );
    });

    it("is mature after a later block", async function () {
      const { queue } = await networkHelpers.loadFixture(enqueueThree);
      assert.equal(await queue.read.isMature(), true);
    });

    it("is not mature when depleted", async function () {
      const { queue } = await networkHelpers.loadFixture(enqueueThree);
      await queue.write.dequeue();
      await queue.write.dequeue();
      await queue.write.dequeue();
      assert.equal(await queue.read.isMature(), false);
    });

    it("reverts when dequeuing when depleted", async function () {
      const { queue } = await networkHelpers.loadFixture(enqueueThree);
      await queue.write.dequeue();
      await queue.write.dequeue();
      await queue.write.dequeue();
      await viem.assertions.revertWith(queue.write.dequeue(), "Queue is empty");
    });

    it("counts how many things are inside", async function () {
      const { queue } = await networkHelpers.loadFixture(enqueueThree);
      assert.equal(await queue.read.count(), 3n);
      await queue.write.dequeue();
      assert.equal(await queue.read.count(), 2n);
      await queue.write.dequeue();
      assert.equal(await queue.read.count(), 1n);
    });
  });

  it("is not mature in the same block as enqueue", async function () {
    const { queue, a } = await networkHelpers.loadFixture(deployQueue);
    await queue.write.enqueue([a.account.address, 1]);
    assert.equal(await queue.read.isMature(), false);
  });
});
