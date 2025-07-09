import { http, createConfig } from 'wagmi';
import { type Chain } from 'viem';

export const monad = {
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz/'] },
  },
  blockExplorers: {
    default: {
      name: 'MonadExplorer',
      url: 'https://testnet.monadexplorer.com',
    },
  },
  testnet: true,
} as const satisfies Chain;

export const config = createConfig({
  chains: [monad],
  transports: {
    [monad.id]: http(),
  },
  ssr: true, // Enable SSR for Next.js App Router
});
