const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ThreeChiefOfficers", async function () {
  let ThreeChiefOfficersMock;
  let threeChiefOfficersMock;
  let ceo, cfo, coo, otherAccount, moreAccounts;

  before(async function () {
    [ceo, cfo, coo, otherAccount, ...moreAccounts] = await ethers.getSigners();
  });

  describe("initial state", async function () {
    beforeEach(async function () {
      ThreeChiefOfficersMock = await ethers.getContractFactory("ThreeChiefOfficersMock", ceo);
      threeChiefOfficersMock = await ThreeChiefOfficersMock.deploy();
    });

    it("the initial CEO should be the contract deployer", async function () {
      expect(await threeChiefOfficersMock.executiveOfficer()).to.equal(ceo.address);
    });

    it("the initial CFO should be empty", async function () {
      expect(await threeChiefOfficersMock.financialOfficer()).to.equal(ethers.constants.AddressZero);
    });

    it("the initial COO should be empty", async function () {
      expect(await threeChiefOfficersMock.operatingOfficer()).to.equal(ethers.constants.AddressZero);
    });
  });
  
  describe("setting CEO", async function () {
    beforeEach(async function () {
      ThreeChiefOfficersMock = await ethers.getContractFactory("ThreeChiefOfficersMock", ceo);
      threeChiefOfficersMock = await ThreeChiefOfficersMock.deploy();
    });
  
    it("should allow CEO to set CEO", async function () {
      expect(await threeChiefOfficersMock.executiveOfficer()).to.equal(ceo.address);

      await threeChiefOfficersMock.connect(ceo).setExecutiveOfficer(otherAccount.address);
      const newCeo = await threeChiefOfficersMock.executiveOfficer();
      expect(newCeo).to.equal(otherAccount.address);
    });
  
    it("should not allow random person to set CEO", async function () {
      expect(await threeChiefOfficersMock.executiveOfficer()).to.equal(ceo.address);

      await expect(threeChiefOfficersMock.connect(otherAccount).setExecutiveOfficer(otherAccount.address))
          .to.be.revertedWith("NotExecutiveOfficer()");
    });
  });
  
  describe("setting CFO", async function () {
    beforeEach(async function () {
      ThreeChiefOfficersMock = await ethers.getContractFactory("ThreeChiefOfficersMock", ceo);
      threeChiefOfficersMock = await ThreeChiefOfficersMock.deploy();
    });
  
    it("should allow CEO to set CFO", async function () {
      expect(await threeChiefOfficersMock.financialOfficer()).to.equal(ethers.constants.AddressZero);

      await threeChiefOfficersMock.connect(ceo).setFinancialOfficer(otherAccount.address);
      const newCfo = await threeChiefOfficersMock.financialOfficer();
      expect(newCfo).to.equal(otherAccount.address);
    });
  
    it("should not allow random person to set CFO", async function () {
      expect(await threeChiefOfficersMock.financialOfficer()).to.equal(ethers.constants.AddressZero);

      await expect(threeChiefOfficersMock.connect(otherAccount).setFinancialOfficer(otherAccount.address))
          .to.be.revertedWith("NotExecutiveOfficer()");
    });
  });
  
  describe("setting COO", async function () {
    beforeEach(async function () {
      ThreeChiefOfficersMock = await ethers.getContractFactory("ThreeChiefOfficersMock", ceo);
      threeChiefOfficersMock = await ThreeChiefOfficersMock.deploy();
    });
  
    it("should allow CEO to set COO", async function () {
      expect(await threeChiefOfficersMock.operatingOfficer()).to.equal(ethers.constants.AddressZero);

      await threeChiefOfficersMock.connect(ceo).setOperatingOfficer(otherAccount.address);
      const newCoo = await threeChiefOfficersMock.operatingOfficer();
      expect(newCoo).to.equal(otherAccount.address);
    });
  
    it("should not allow random person to set COO", async function () {
      expect(await threeChiefOfficersMock.operatingOfficer()).to.equal(ethers.constants.AddressZero);

      await expect(threeChiefOfficersMock.connect(otherAccount).setOperatingOfficer(otherAccount.address))
          .to.be.revertedWith("NotExecutiveOfficer()");
    });
  });

  describe("performing COO privileged actions", async function () {
    beforeEach(async function () {
      ThreeChiefOfficersMock = await ethers.getContractFactory("ThreeChiefOfficersMock", ceo);
      threeChiefOfficersMock = await ThreeChiefOfficersMock.deploy();
    });
  
    it("should allow COO to perform privileged actions", async function () {
      await threeChiefOfficersMock.connect(ceo).setOperatingOfficer(coo.address);
      await threeChiefOfficersMock.connect(coo).somethingOnlyOperatingOfficerCanDo();
      expect(true);
    });
  
    it("should not allow random person to perform COO privileged actions", async function () {
      await threeChiefOfficersMock.connect(ceo).setOperatingOfficer(coo.address);
      await expect(threeChiefOfficersMock.connect(otherAccount).somethingOnlyOperatingOfficerCanDo())
          .to.be.revertedWith("NotOperatingOfficer()");
    });
  });

  describe("performing CFO privileged actions", async function () {
    beforeEach(async function () {
      ThreeChiefOfficersMock = await ethers.getContractFactory("ThreeChiefOfficersMock", ceo);
      threeChiefOfficersMock = await ThreeChiefOfficersMock.deploy();
    });
  
    it("should allow CFO to perform privileged action", async function () {
      await threeChiefOfficersMock.connect(ceo).setFinancialOfficer(cfo.address);
      await threeChiefOfficersMock.connect(ceo).donate({value: ethers.utils.parseUnits("1","ether")});
      const tx = await threeChiefOfficersMock.connect(cfo).withdrawBalance();
      //TODO: test that Ether actually gets sent to the CFO
      expect(true);
    });
  
    it("should not allow random person to perform CFO privileged action", async function () {
      await threeChiefOfficersMock.connect(ceo).setFinancialOfficer(cfo.address);
      await threeChiefOfficersMock.connect(ceo).donate({value: ethers.utils.parseUnits("1","ether")});

      await expect(threeChiefOfficersMock.connect(otherAccount).withdrawBalance())
          .to.be.revertedWith("NotFinancialOfficer()");
    });
  });
});