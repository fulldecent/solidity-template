import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";
import { parseEther, zeroAddress } from "viem";

describe("ThreeChiefOfficers", async function () {
  const { viem, networkHelpers } = await network.create();
  const publicClient = await viem.getPublicClient();

  async function deployOfficers() {
    const [ceo, cfo, coo, other] = await viem.getWalletClients();
    const officers = await viem.deployContract("ThreeChiefOfficersMock");
    return { officers, ceo, cfo, coo, other };
  }

  describe("initial state", function () {
    it("the initial CEO should be the contract deployer", async function () {
      const { officers, ceo } = await networkHelpers.loadFixture(deployOfficers);
      assert.equal(
        (await officers.read.executiveOfficer()).toLowerCase(),
        ceo.account.address.toLowerCase(),
      );
    });

    it("the initial CFO should be empty", async function () {
      const { officers } = await networkHelpers.loadFixture(deployOfficers);
      assert.equal(await officers.read.financialOfficer(), zeroAddress);
    });

    it("the initial COO should be empty", async function () {
      const { officers } = await networkHelpers.loadFixture(deployOfficers);
      assert.equal(await officers.read.operatingOfficer(), zeroAddress);
    });
  });

  describe("setting CEO", function () {
    it("should allow CEO to set CEO", async function () {
      const { officers, other } = await networkHelpers.loadFixture(deployOfficers);
      await officers.write.setExecutiveOfficer([other.account.address]);
      assert.equal(
        (await officers.read.executiveOfficer()).toLowerCase(),
        other.account.address.toLowerCase(),
      );
    });

    it("should not allow random person to set CEO", async function () {
      const { officers, other } = await networkHelpers.loadFixture(deployOfficers);
      await viem.assertions.revertWithCustomError(
        officers.write.setExecutiveOfficer([other.account.address], {
          account: other.account,
        }),
        officers,
        "NotExecutiveOfficer",
      );
    });
  });

  describe("setting CFO", function () {
    it("should allow CEO to set CFO", async function () {
      const { officers, other } = await networkHelpers.loadFixture(deployOfficers);
      await officers.write.setFinancialOfficer([other.account.address]);
      assert.equal(
        (await officers.read.financialOfficer()).toLowerCase(),
        other.account.address.toLowerCase(),
      );
    });

    it("should not allow random person to set CFO", async function () {
      const { officers, other } = await networkHelpers.loadFixture(deployOfficers);
      await viem.assertions.revertWithCustomError(
        officers.write.setFinancialOfficer([other.account.address], {
          account: other.account,
        }),
        officers,
        "NotExecutiveOfficer",
      );
    });
  });

  describe("setting COO", function () {
    it("should allow CEO to set COO", async function () {
      const { officers, other } = await networkHelpers.loadFixture(deployOfficers);
      await officers.write.setOperatingOfficer([other.account.address]);
      assert.equal(
        (await officers.read.operatingOfficer()).toLowerCase(),
        other.account.address.toLowerCase(),
      );
    });

    it("should not allow random person to set COO", async function () {
      const { officers, other } = await networkHelpers.loadFixture(deployOfficers);
      await viem.assertions.revertWithCustomError(
        officers.write.setOperatingOfficer([other.account.address], {
          account: other.account,
        }),
        officers,
        "NotExecutiveOfficer",
      );
    });
  });

  describe("performing COO privileged actions", function () {
    it("should allow COO to perform privileged actions", async function () {
      const { officers, coo } = await networkHelpers.loadFixture(deployOfficers);
      await officers.write.setOperatingOfficer([coo.account.address]);
      await officers.write.somethingOnlyOperatingOfficerCanDo({
        account: coo.account,
      });
    });

    it("should not allow random person to perform COO privileged actions", async function () {
      const { officers, coo, other } =
        await networkHelpers.loadFixture(deployOfficers);
      await officers.write.setOperatingOfficer([coo.account.address]);
      await viem.assertions.revertWithCustomError(
        officers.write.somethingOnlyOperatingOfficerCanDo({
          account: other.account,
        }),
        officers,
        "NotOperatingOfficer",
      );
    });
  });

  describe("performing CFO privileged actions", function () {
    it("should allow CFO to withdraw donated Ether", async function () {
      const { officers, cfo } = await networkHelpers.loadFixture(deployOfficers);
      await officers.write.setFinancialOfficer([cfo.account.address]);
      const donation = parseEther("1");
      await officers.write.donate({ value: donation });

      const before = await publicClient.getBalance({
        address: cfo.account.address,
      });
      const hash = await officers.write.withdrawBalance({
        account: cfo.account,
      });
      const receipt = await publicClient.getTransactionReceipt({ hash });
      const gas = receipt.gasUsed * receipt.effectiveGasPrice;
      const after = await publicClient.getBalance({
        address: cfo.account.address,
      });

      assert.equal(after, before + donation - gas);
      assert.equal(
        await publicClient.getBalance({ address: officers.address }),
        0n,
      );
    });

    it("should not allow random person to withdraw", async function () {
      const { officers, cfo, other } =
        await networkHelpers.loadFixture(deployOfficers);
      await officers.write.setFinancialOfficer([cfo.account.address]);
      await officers.write.donate({ value: parseEther("1") });
      await viem.assertions.revertWithCustomError(
        officers.write.withdrawBalance({ account: other.account }),
        officers,
        "NotFinancialOfficer",
      );
    });
  });
});
