'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { counterAddress, counterAbi } from '@/lib/constants';

export default function Home() {
  // --- WAGMI HOOKS for WALLET CONNECTION ---

  // `useAccount` provides information about the connected account, like its address and connection status.
  const { address, isConnected } = useAccount();

  // `useConnect` provides functions to initiate a connection to a wallet.
  const { connect, connectors } = useConnect();

  // `useDisconnect` provides a function to disconnect the currently connected wallet.
  const { disconnect } = useDisconnect();

  // --- WAGMI HOOKS for CONTRACT INTERACTION ---

  // 1. READ from the contract.
  // This hook reads the public `count` variable. `refetch` allows us to manually re-read the value.
  const { data: count, refetch } = useReadContract({
    address: counterAddress,
    abi: counterAbi,
    functionName: 'count',
  });

  // 2. WRITE to the contract.
  // This hook provides the `writeContract` function to call state-changing methods.
  // It returns the transaction `hash`, `isPending` state, and any `error` that occurs.
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  // 3. WAIT for a transaction to be mined.
  // This hook monitors a transaction hash and tells us when it's being confirmed (`isLoading`) 
  // and when it has been successfully mined (`isSuccess`).
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // --- SIDE EFFECTS ---

  // This `useEffect` hook handles feedback for the user based on the transaction lifecycle.
  // It runs whenever the transaction status (`isConfirmed`, `error`) changes.
  useEffect(() => {
    // When the transaction is successfully confirmed by the network:
    if (isConfirmed) {
      toast.success('Transaction confirmed!');
      refetch(); // Re-fetch the counter value to update the UI.
    }
    // If an error occurs while sending the transaction:
    if (error) {
      toast.error(error.message || 'Transaction failed.');
    }
  }, [isConfirmed, error, refetch]);

  // --- EVENT HANDLERS ---

  // This function is called when the 'Increment' button is clicked.
  const handleIncrement = () => {
    writeContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: 'increment',
    });
  };

  // This function is called when the 'Decrement' button is clicked.
  const handleDecrement = () => {
    writeContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: 'decrement',
    });
  };

  // Find the MetaMask connector from the list of available connectors.
  const connector = connectors.find((c) => c.id === 'io.metamask');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Counter DApp</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Interacting with Monad Testnet
          </p>
        </div>

        {isConnected ? (
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm">Connected as:</p>
            <p className="font-mono text-sm truncate">{address}</p>
            <button
              onClick={() => disconnect()}
              className="mt-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => connector && connect({ connector })}
            disabled={!connector}
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {connector ? 'Connect MetaMask' : 'MetaMask not found'}
          </button>
        )}

        <div className="text-center space-y-4">
          <p className="text-6xl font-bold">{count?.toString() ?? '...'}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDecrement}
              disabled={!isConnected || isPending || isConfirming}
              className="px-8 py-3 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50"
            >
              {isPending || isConfirming ? '...' : '-'}
            </button>
            <button
              onClick={handleIncrement}
              disabled={!isConnected || isPending || isConfirming}
              className="px-8 py-3 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:opacity-50"
            >
              {isPending || isConfirming ? '...' : '+'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
