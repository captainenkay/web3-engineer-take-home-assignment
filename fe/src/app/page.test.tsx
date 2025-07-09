/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './page';
import { WagmiProvider, useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi';
import React from 'react';

// Mock the wagmi hooks
vi.mock('wagmi', async (importOriginal) => {
  const original = await importOriginal<typeof import('wagmi')>();
  return {
    ...original,
    useAccount: vi.fn(),
    useConnect: vi.fn(),
    useDisconnect: vi.fn(),
    useReadContract: vi.fn(),
    useWriteContract: vi.fn(),
    useWaitForTransactionReceipt: vi.fn(),
  };
});

// A simple wrapper to provide necessary context for the component
const queryClient = new QueryClient();
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProvider>
);

describe('Home Component', () => {
  // Mock return values before each test
  beforeEach(() => {
    vi.mocked(useConnect).mockReturnValue({ connect: vi.fn(), connectors: [{ id: 'io.metamask', name: 'MetaMask' }] } as any);
    vi.mocked(useDisconnect).mockReturnValue({ disconnect: vi.fn() } as any);
    vi.mocked(useWriteContract).mockReturnValue({ writeContract: vi.fn(), data: undefined, isPending: false } as any);
    vi.mocked(useWaitForTransactionReceipt).mockReturnValue({ isLoading: false, isSuccess: false } as any);
  });

  it('renders connect button when disconnected', () => {
    vi.mocked(useAccount).mockReturnValue({ isConnected: false } as any);
    vi.mocked(useReadContract).mockReturnValue({ data: undefined, refetch: vi.fn() } as any);

    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByText('Connect MetaMask')).toBeInTheDocument();
  });

  it('displays the count when connected', () => {
    vi.mocked(useAccount).mockReturnValue({ isConnected: true, address: '0x123' } as any);
    vi.mocked(useReadContract).mockReturnValue({ data: 10n, refetch: vi.fn() } as any); // Use BigInt for count

    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Connected as:')).toBeInTheDocument();
  });

  it('calls increment function on button click', () => {
    const writeContract = vi.fn();
    vi.mocked(useAccount).mockReturnValue({ isConnected: true, address: '0x123' } as any);
    vi.mocked(useReadContract).mockReturnValue({ data: 10n, refetch: vi.fn() } as any);
    vi.mocked(useWriteContract).mockReturnValue({ writeContract, data: undefined, isPending: false } as any);

    render(<Home />, { wrapper: TestWrapper });

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    expect(writeContract).toHaveBeenCalledWith({
      abi: expect.any(Array),
      address: expect.any(String),
      functionName: 'increment',
    });
  });

  it('calls decrement function on button click', () => {
    const writeContract = vi.fn();
    vi.mocked(useAccount).mockReturnValue({ isConnected: true, address: '0x123' } as any);
    vi.mocked(useReadContract).mockReturnValue({ data: 10n, refetch: vi.fn() } as any);
    vi.mocked(useWriteContract).mockReturnValue({ writeContract, data: undefined, isPending: false } as any);

    render(<Home />, { wrapper: TestWrapper });

    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    expect(writeContract).toHaveBeenCalledWith({
      abi: expect.any(Array),
      address: expect.any(String),
      functionName: 'decrement',
    });
  });
});
