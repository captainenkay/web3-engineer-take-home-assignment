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
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { data: count, refetch } = useReadContract({
    address: counterAddress,
    abi: counterAbi,
    functionName: 'count',
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed!');
      refetch();
    }
    if (error) {
      toast.error(error.message || 'Transaction failed.');
    }
  }, [isConfirmed, error, refetch]);

  const handleIncrement = () => {
    writeContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: 'increment',
    });
  };

  const handleDecrement = () => {
    writeContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: 'decrement',
    });
  };

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
