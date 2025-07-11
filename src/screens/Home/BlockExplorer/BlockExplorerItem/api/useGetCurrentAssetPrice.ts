import { useQuery } from '@tanstack/react-query';

import { getBlockchainAssetPrice } from './services/blockchain';
import { getValrAssetPrice } from './services/valr';
import type { AssetSymbol } from './types';

export function getCurrentAssetPriceQueryKey(symbol: AssetSymbol) {
  return ['currentAssetPrice', symbol];
}

export function useGetCurrentAssetPrice(symbol: AssetSymbol) {
  return useQuery({
    queryKey: getCurrentAssetPriceQueryKey(symbol),
    queryFn: () => getCurrentAssetPrice(symbol),
    refetchInterval: 30_000, // Refetch every 30 seconds
    staleTime: 10_000, // Consider data stale after 10 seconds
  });
}

/**
 * Get the current asset price from the blockchain API or the VALR API.
 * If the blockchain API key is not set, use the VALR API.
 *
 * Note: The reason I added the VALR fallback approach is because the blockchain API
 * for prices seems to be deprecated (see https://exchange.blockchain.com/)
 *
 * @param symbol - The asset symbol
 * @returns The current asset price in USD
 */
async function getCurrentAssetPrice(symbol: AssetSymbol): Promise<number> {
  const apiKey = import.meta.env.VITE_BLOCKCHAIN_API_KEY;

  if (!apiKey) {
    /**
     * Use VALR API if blockchain API key is not set.
     */
    return await getValrAssetPrice(symbol);
  }

  return await getBlockchainAssetPrice(symbol);
}
