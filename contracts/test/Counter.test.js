const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;
  let owner;

  // Deploy a new Counter contract before each test
  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    [owner] = await ethers.getSigners();
    counter = await Counter.deploy();
    await counter.waitForDeployment();
  });

  it("Should deploy with the count set to 0", async function () {
    expect(await counter.count()).to.equal(0);
  });

  describe("increment", function () {
    it("Should increment the count by 1", async function () {
      await counter.increment();
      expect(await counter.count()).to.equal(1);
    });

    it("Should emit a CountChanged event with the new count", async function () {
      const tx = await counter.increment();
      await expect(tx)
        .to.emit(counter, "CountChanged")
        .withArgs(1);
    });
  });

  describe("decrement", function () {
    // First, increment the count to 1 so we can test decrementing
    beforeEach(async function () {
      await counter.increment();
    });

    it("Should decrement the count by 1", async function () {
      await counter.decrement();
      expect(await counter.count()).to.equal(0);
    });

    it("Should emit a CountChanged event with the new count", async function () {
      const tx = await counter.decrement();
      await expect(tx)
        .to.emit(counter, "CountChanged")
        .withArgs(0);
    });

    it("Should revert if trying to decrement when count is 0", async function () {
      // Decrement to 0 first
      await counter.decrement();
      expect(await counter.count()).to.equal(0);

      // Expect the next decrement to be reverted with the specified message
      await expect(counter.decrement()).to.be.revertedWith("Count cannot be negative");
    });
  });
});
