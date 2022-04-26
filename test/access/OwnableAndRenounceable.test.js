const { constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { expect } = require('chai');

const OwnableAndRenounceable = artifacts.require('OwnableAndRenounceableMock');

contract('Ownable', function (accounts) {
  const [ owner, other ] = accounts;

  beforeEach(async function () {
    this.ownable = await OwnableAndRenounceable.new({ from: owner });
  });

  it('has an owner', async function () {
    expect(await this.ownable.owner()).to.equal(owner);
  });

  describe('transfer ownership', function () {
    it('changes owner after transfer', async function () {
      const receipt = await this.ownable.transferOwnership(other, { from: owner });
      expectEvent(receipt, 'OwnershipTransferred');

      expect(await this.ownable.owner()).to.equal(other);
    });

    it('prevents non-owners from transferring', async function () {
      await expectRevert(
        this.ownable.transferOwnership(other, { from: other }),
        'Ownable: calling is function is restricted to the owner, and the caller is not the owner',
      );
    });

    it('guards ownership against stuck state', async function () {
      await expectRevert(
        this.ownable.transferOwnership(ZERO_ADDRESS, { from: owner }),
        'Ownable: transferring to the zero address is disallowed, if you want to disown the contract, see `renounceOwnership`',
      );
    });
  });

  describe('renounce ownership', function () {
    it('loses owner after renouncement', async function () {
      const receipt = await this.ownable.renounceOwnership({ from: owner });
      expectEvent(receipt, 'OwnershipTransferred');

      expect(await this.ownable.owner()).to.equal(ZERO_ADDRESS);
    });

    it('prevents non-owners from renouncement', async function () {
      await expectRevert(
        this.ownable.renounceOwnership({ from: other }),
        'Ownable: calling is function is restricted to the owner, and the caller is not the owner',
      );
    });
  });
});
