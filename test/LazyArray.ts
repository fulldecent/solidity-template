import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";
import { parseEventLogs } from "viem";

describe("LazyArray", async function () {
  const { viem, networkHelpers } = await network.create();
  const publicClient = await viem.getPublicClient();

  async function deployArray() {
    const lazyArray = await viem.deployContract("LazyArrayMock");
    return { lazyArray };
  }

  async function popValue(
    lazyArray: Awaited<ReturnType<typeof deployArray>>["lazyArray"],
    index: bigint,
  ) {
    const hash = await lazyArray.write.popByIndex([index]);
    const receipt = await publicClient.getTransactionReceipt({ hash });
    const events = parseEventLogs({
      abi: lazyArray.abi,
      eventName: "PopByIndexReturn",
      logs: receipt.logs,
    });
    assert.equal(events.length, 1);
    return events[0].args.popped;
  }

  function expectIsASetFromOneToLength(values: bigint[]) {
    const set = new Set(values.map((v) => v.toString()));
    assert.equal(set.size, values.length);
    for (let i = 1n; i <= BigInt(values.length); i++) {
      assert.equal(set.has(i.toString()), true);
    }
  }

  describe("can initialize", function () {
    it("initializes to 1", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([1n]);
      assert.equal(await lazyArray.read.count(), 1n);
      assert.equal(await lazyArray.read.getByIndex([0n]), 1n);
    });

    it("initializes to 999", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([999n]);
      assert.equal(await lazyArray.read.count(), 999n);
      assert.equal(await lazyArray.read.getByIndex([998n]), 999n);
    });

    it("initializes to 0", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([0n]);
      assert.equal(await lazyArray.read.count(), 0n);
    });
  });

  describe("can pop from middle", function () {
    it("pops from middle of 3", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([3n]);
      const items = [await popValue(lazyArray, 1n)];
      for (let i = 0; i < 2; i++) {
        items.push(await popValue(lazyArray, 0n));
      }
      expectIsASetFromOneToLength(items);
    });

    it("pops from middle of 100", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([100n]);
      const items = [await popValue(lazyArray, 50n)];
      for (let i = 0; i < 99; i++) {
        items.push(await popValue(lazyArray, 0n));
      }
      expectIsASetFromOneToLength(items);
    });
  });

  describe("counts items inside", function () {
    it("counts 1", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([1n]);
      assert.equal(await lazyArray.read.count(), 1n);
    });

    it("counts 999", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([999n]);
      assert.equal(await lazyArray.read.count(), 999n);
    });

    it("counts 0", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([0n]);
      assert.equal(await lazyArray.read.count(), 0n);
    });
  });

  describe("prevents double initialization", function () {
    it("throws when initialized twice", async function () {
      const { lazyArray } = await networkHelpers.loadFixture(deployArray);
      await lazyArray.write.initialize([1n]);
      await viem.assertions.revertWithCustomError(
        lazyArray.write.initialize([1n]),
        lazyArray,
        "AlreadyInitialized",
      );
    });
  });
});
