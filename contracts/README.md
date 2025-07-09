# Smart Contract (Hardhat)

This directory contains the Solidity smart contract for the Counter DApp, developed and tested using the [Hardhat](https://hardhat.org/) framework.

---

## Contract Details

*   **Contract:** `Counter.sol`
*   **Description:** A simple contract that stores a public `count` variable (a `uint256`). It includes functions to `increment()` and `decrement()` the count, emitting a `CountChanged` event on each modification.

---

## Available Hardhat Commands

All commands should be run from within this `/contracts` directory.

### Compile

Compiles the smart contract and generates ABI files in the `artifacts` directory.

```bash
npm install # Run this first
npx hardhat compile
```

### Test

Runs the automated tests located in the `/test` directory.

```bash
npx hardhat test
```

### Deploy

To deploy the contract, you can use the provided deployment script. 

**1. Deploy to a local Hardhat Network:**

First, start a local node in a separate terminal:
```bash
npx hardhat node
```

Then, run the deployment script against the `localhost` network:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**2. Deploy to Monad Testnet:**

Ensure you have a `.env` file in this directory with your `PRIVATE_KEY`.

```bash
npx hardhat run scripts/deploy.js --network monad
```
