# Web3 Counter DApp

This project is a complete Web3 Decentralized Application (DApp) that allows users to interact with a `Counter` smart contract deployed on a test network. It includes a Solidity smart contract, a Next.js frontend, comprehensive tests, and a CI/CD pipeline using GitHub Actions.

---

## Deployed Links

*   **Frontend (Vercel):** [https://web3-engineer-take-home-assignment.vercel.app/](https://web3-engineer-take-home-assignment.vercel.app/)
*   **Smart Contract (Monad Testnet):** `0x9044200e0884E4D068a43a3e2A1Db0537065284a`

---

## Project Structure

The project is organized as a monorepo with two main packages:

*   `./contracts`: Contains the Solidity smart contract, deployment scripts, and tests using Hardhat.
*   `./fe`: Contains the Next.js frontend application for interacting with the smart contract, built with TypeScript, wagmi, and Tailwind CSS.
*   `./.github/workflows`: Contains the CI/CD pipeline configuration for automated linting, testing, and deployment.

---

## Getting Started

### Prerequisites

*   Node.js (v20.x or later)
*   npm
*   MetaMask browser extension

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/captainenkay/web3-engineer-take-home-assignment.git
    cd web3-engineer-take-home-assignment
    ```

2.  **Set up the Smart Contract:**
    ```bash
    cd contracts
    npm install
    npx hardhat test # Run tests
    ```
    To deploy to a local network:
    ```bash
    npx hardhat node # Start a local node
    npx hardhat run scripts/deploy.js --network localhost # Deploy the contract
    ```

3.  **Set up the Frontend:**
    ```bash
    cd fe
    npm install
    npm run dev # Start the development server
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Running Tests and Linting

*   **Run all contract tests:**
    ```bash
    cd contracts
    npx hardhat test
    ```
*   **Run all frontend tests:**
    ```bash
    cd fe
    npm test
    ```
*   **Run frontend linter:**
    ```bash
    cd fe
    npm run lint
    ```

---

## Technology Choices

### Web3 Library: `wagmi` & `viem`

For this project, I chose **`wagmi`** (a collection of React Hooks for Ethereum) and its dependency **`viem`** (a lightweight Ethereum interface) over older libraries like Ethers.js or Web3.js. Here's the justification:

1.  **Modern, Hook-Based Approach:** `wagmi` is designed for modern React development. Its hook-based architecture (`useAccount`, `useReadContract`, `useWriteContract`, etc.) integrates seamlessly with React's component lifecycle, leading to cleaner, more declarative, and more readable code compared to the imperative style of older libraries.

2.  **Type Safety:** Built with TypeScript from the ground up, `wagmi` and `viem` provide excellent type inference and safety. This significantly reduces runtime errors, improves developer experience with autocompletion, and makes the codebase more maintainable.

3.  **Performance and Lightweight:** `viem` is highly optimized for performance and has a much smaller bundle size than Ethers.js, which is crucial for building fast, responsive frontend applications.

4.  **Built-in State Management:** `wagmi` handles the complexities of blockchain state (connection status, account changes, network switches) automatically, reducing the amount of boilerplate code needed.

5.  **Great Documentation and Active Development:** The `wagmi` ecosystem is actively maintained with a growing community and excellent documentation, making it a reliable choice for future projects.
