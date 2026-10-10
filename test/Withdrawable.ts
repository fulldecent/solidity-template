import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";
import { parseEther } from "viem";

describe("Withdrawable", async function () {
  const { viem, networkHelpers } = await network.create();
  const publicClient = await viem.getPublicClient();

  async function deployWithdrawable() {
    const [owner, beneficiary] = await viem.getWalletClients();
    const withdrawable = await viem.deployContract("WithdrawableMock");
    return { withdrawable, owner, beneficiary };
  }

  it("credits a pending withdrawal and pays it out", async function () {
    const { withdrawable, beneficiary } = await networkHelpers.loadFixture(deployWithdrawable);
    const amount = parseEther("1");

    await withdrawable.write.sendValue({ value: amount });
    await viem.assertions.emitWithArgs(
      withdrawable.write.increasePendingWithdrawal([beneficiary.account.address, amount]),
      withdrawable,
      "PendingWithdrawal",
      [beneficiary.account.address, amount],
    );
    assert.equal(await withdrawable.read.pendingWithdrawal([beneficiary.account.address]), amount);

    const before = await publicClient.getBalance({
      address: beneficiary.account.address,
    });
    const hash = await withdrawable.write.withdraw({
      account: beneficiary.account,
    });
    const receipt = await publicClient.getTransactionReceipt({ hash });
    const gas = receipt.gasUsed * receipt.effectiveGasPrice;
    const after = await publicClient.getBalance({
      address: beneficiary.account.address,
    });

    assert.equal(after, before + amount - gas);
    assert.equal(await withdrawable.read.pendingWithdrawal([beneficiary.account.address]), 0n);
  });
});
