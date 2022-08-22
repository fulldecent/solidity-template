// Tests for the erc20 batch transfer

// const { expectRevert, expectEvent, BN } = require('@openzeppelin/test-helpers');
const { expect } = require("chai");
const { ethers } = require("hardhat");

// const ERC20BatchTransfer = artifacts.require('ERC20BatchTransfer');
// const ERC20Partial = artifacts.require('ERC20Partial');

describe("ERC20BatchTransfer", async function () {
    let ERC20Mock;
    let ERC20BatchTransfer;
    let admin, user1, user2, moreAccounts;

    before(async function () {
        [admin, user1, user2, ...moreAccounts] = await ethers.getSigners();
    });

    describe("performing batch transfers", async function () {
        const init_balance = 100;
        const init_supply = 1000;
    
        beforeEach(async function () {
            Mock = await ethers.getContractFactory("ERC20Mock", admin);

            mock1 = await Mock.deploy("FirstMock", "MK1", init_supply);
            expect(await mock1.connect(admin).transfer(admin.address, init_supply));
            expect(await mock1.connect(admin).transfer(user1.address, init_balance));
            expect(await mock1.connect(admin).transfer(user2.address, init_balance));

            mock2 = await Mock.deploy("SecondMock", "MK2", init_supply);
            expect(await mock2.connect(admin).transfer(admin.address, init_supply));
            expect(await mock2.connect(admin).transfer(user1.address, init_balance));
            expect(await mock2.connect(admin).transfer(user2.address, init_balance));

            BatchTransfer = await ethers.getContractFactory("ERC20BatchTransfer", admin);
            batchTransfer = await BatchTransfer.deploy()
        });
    
        it("should begin with the right supply", async function () {
            expect(await mock1.totalSupply()).to.equal(init_supply);
            expect(await mock1.balanceOf(admin.address)).to.equal(init_supply-2*init_balance);
            expect(await mock1.balanceOf(user1.address)).to.equal(init_balance);
            expect(await mock1.balanceOf(user2.address)).to.equal(init_balance);

            expect(await mock2.totalSupply()).to.equal(init_supply);
            expect(await mock2.balanceOf(admin.address)).to.equal(init_supply-2*init_balance);
            expect(await mock2.balanceOf(user1.address)).to.equal(init_balance);
            expect(await mock2.balanceOf(user2.address)).to.equal(init_balance);
        });

        it("should make single transfers", async function () {

            await mock1.connect(admin).approve(batchTransfer.address, 10);
            await mock2.connect(admin).approve(batchTransfer.address, 10);

            await batchTransfer.connect(admin).batchTransfer(mock1.address, [user1.address], [10]);
            await batchTransfer.connect(admin).batchTransfer(mock2.address, [user2.address], [10]);
            expect(await mock1.balanceOf(user1.address)).to.equal(init_balance+10);
            expect(await mock2.balanceOf(user2.address)).to.equal(init_balance+10);
        });

        it("should return an error if either array is empty", async function () {
            await expect(batchTransfer.connect(admin).batchTransfer(mock1.address, [user1.address, user2.address], []))
                .to.be.revertedWith('Must input at least one recipient and one value.');
            
            await expect(batchTransfer.connect(admin).batchTransfer(mock1.address, [], [10, 10]))
                .to.be.revertedWith('Must input at least one recipient and one value.');

            await expect(batchTransfer.connect(admin).batchTransfer(mock1.address, [], []))
                .to.be.revertedWith('Must input at least one recipient and one value.');
        });

        it("should return an error if it receives unequal arrays", async function () {
            await mock1.connect(admin).approve(batchTransfer.address, init_balance/2+init_balance/10);
            await expect(batchTransfer.connect(admin).batchTransfer(mock1.address, [user1.address, user2.address], [init_balance / 2]))
                .to.be.revertedWith('Length of recipients and values must be equal.');
        });

        it("should transfer multiple tokens", async function () {
            await mock1.connect(admin).approve(batchTransfer.address, init_balance/2+init_balance/10);
            batchTransfer.connect(admin).batchTransfer(mock1.address, [user1.address, user2.address], [init_balance/2, init_balance/10]);
            expect(await mock1.balanceOf(user1.address)).to.equal(init_balance+init_balance/2);
            expect(await mock1.balanceOf(user2.address)).to.equal(init_balance+init_balance/10);
            expect(await mock1.balanceOf(admin.address)).to.equal(init_supply-2*init_balance-init_balance/2-init_balance/10);
            expect(await mock1.totalSupply()).to.equal(init_supply);

            await mock2.connect(admin).approve(batchTransfer.address, init_balance/2+init_balance/10);
            batchTransfer.connect(admin).batchTransfer(mock2.address, [user1.address, user2.address], [init_balance/2, init_balance/10]);
            expect(await mock2.balanceOf(user1.address)).to.equal(init_balance+init_balance/2);
            expect(await mock2.balanceOf(user2.address)).to.equal(init_balance+init_balance/10);
            expect(await mock2.balanceOf(admin.address)).to.equal(init_supply-2*init_balance-init_balance/2-init_balance/10);
            expect(await mock2.totalSupply()).to.equal(init_supply);
        });

        it("should allow users to make multiple transfers to the same address", async function () {
            await mock1.connect(admin).approve(batchTransfer.address, init_balance/2);
            batchTransfer.connect(admin).batchTransfer(mock1.address, [user1.address, user1.address], [init_balance/4, init_balance/4]);
            expect(await mock1.balanceOf(user1.address)).to.equal(init_balance+init_balance/2);
            expect(await mock1.balanceOf(admin.address)).to.equal(init_supply-2*init_balance-init_balance/2);
            expect(await mock1.totalSupply()).to.equal(init_supply);
        });
    });
});