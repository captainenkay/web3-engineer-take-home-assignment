# Frontend DApp (Next.js)

This directory (`/fe`) contains the frontend for the Web3 Counter DApp. It is a [Next.js](https://nextjs.org/) application built with TypeScript, Tailwind CSS, and the `wagmi` library for wallet and contract interactions.

---

## Overview

The application provides a user interface to:
*   Connect and disconnect a MetaMask wallet.
*   View the current value of the `Counter` smart contract.
*   Send transactions to increment or decrement the counter.
*   Receive real-time feedback on transaction status.

---

## Getting Started

### 1. Install Dependencies

From the project's root directory, navigate into this folder and install the required packages:

```bash
cd fe
npm install
```

### 2. Run the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Creates a production build of the application.
*   `npm run start`: Starts the production server (requires a build first).
*   `npm run lint`: Runs ESLint to check for code quality issues.
*   `npm test`: Runs the unit tests using Vitest.
