const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LazyArray", async function () {
  let LazyArrayMock;
  let lazyArrayMock;

  describe("can initialize", async function () {
    beforeEach(async function () {
      LazyArrayMock = await ethers.getContractFactory("LazyArrayMock");
      lazyArrayMock = await LazyArrayMock.deploy();
    });

    it("initializes to 1", async function () {
      const length = "1";
      await lazyArrayMock.initialize(length);
      expect(await lazyArrayMock.count()).to.equal(length);
      expect(await lazyArrayMock.getByIndex(length - 1)).to.equal(length);
    });

    it("initializes to 999", async function () {
      const length = "999";
      await lazyArrayMock.initialize(length);
      expect(await lazyArrayMock.count()).to.equal(length);
      expect(await lazyArrayMock.getByIndex(length - 1)).to.equal(length);
    });

    it("initializes to 0", async function () {
      const length = "0";
      await lazyArrayMock.initialize(length);
      expect(await lazyArrayMock.count()).to.equal(length);
    });
  });

  describe("can pop from middle", async function () {
    function expectIsASetFromOneToLength(arrayOfNumbers) {
      const set = new Set(arrayOfNumbers);
      for (let i = 1; i <= set.size; i++) {
        expect(set.has(i)).to.equal(true);
      }
    }

    beforeEach(async function () {
      LazyArrayMock = await ethers.getContractFactory("LazyArrayMock");
      lazyArrayMock = await LazyArrayMock.deploy();
    });

    it("pops from middle of 3", async function () {
      const length = "3";
      const oneToPop = "1";
      await lazyArrayMock.initialize(length);
      const items = [];
      const tx = await lazyArrayMock.popByIndex(oneToPop);
      const receipt = await tx.wait();
      items.push(parseInt(receipt.logs[0].data.toString()));
      for (let i = 0; i < length - 1; i++) {
        const tx = await lazyArrayMock.popByIndex(0);
        const receipt = await tx.wait();
        items.push(parseInt(receipt.logs[0].data.toString()));
      }
      expectIsASetFromOneToLength(items);
    });

    it("pops from middle of 100", async function () {
      const length = "100";
      const oneToPop = "50";
      await lazyArrayMock.initialize(length);
      const items = [];
      const tx = await lazyArrayMock.popByIndex(oneToPop);
      const receipt = await tx.wait();
      items.push(parseInt(receipt.logs[0].data.toString()));
      for (let i = 0; i < length - 1; i++) {
        const tx = await lazyArrayMock.popByIndex(0);
        const receipt = await tx.wait();
        items.push(parseInt(receipt.logs[0].data.toString()));
      }
      expectIsASetFromOneToLength(items);
    });
  });

  describe("counts items inside", async function () {
    it("counts 1", async function () {
      const length = "1";
      const lazyArrayMock = await LazyArrayMock.deploy();
      await lazyArrayMock.initialize(length);
      expect(await lazyArrayMock.count()).to.equal(length);
    });

    it("counts 999", async function () {
      const length = "999";
      const lazyArrayMock = await LazyArrayMock.deploy();
      await lazyArrayMock.initialize(length);
      expect(await lazyArrayMock.count()).to.equal(length);
    });

    it("counts 0", async function () {
      const length = "0";
      const lazyArrayMock = await LazyArrayMock.deploy();
      await lazyArrayMock.initialize(length);
      expect(await lazyArrayMock.count()).to.equal(length);
    });
  });

  describe("prevents double initialization", async function () {
    it("throws when initialized twice", async function () {
      const length = "1";
      const lazyArrayMock = await LazyArrayMock.deploy();
      await lazyArrayMock.initialize(length);

      await expect(lazyArrayMock.initialize(length))
          .to.be.revertedWith("AlreadyInitialized()");
    });
  });
});