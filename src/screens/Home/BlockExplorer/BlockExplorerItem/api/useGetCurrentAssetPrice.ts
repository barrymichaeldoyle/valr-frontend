import { useQuery } from '@tanstack/react-query';

export type AssetSymbol = 'BTC-USD' | 'ETH-USD' | 'BCH-USD';

interface PriceData {
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
}

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

async function getCurrentAssetPrice(symbol: AssetSymbol): Promise<PriceData> {
  const apiKey = import.meta.env.VITE_BLOCKCHAIN_API_KEY;

  if (!apiKey) {
    throw new Error('Blockchain API key not found');
  }

  const response = await fetch(
    `https://api.blockchain.com/v3/exchange/tickers/${symbol}`,
    { headers: { 'X-API-Token': apiKey, 'Content-Type': 'application/json' } }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch price for ${symbol}: ${response.statusText}`
    );
  }

  const data = await response.json();

  return {
    price: parseFloat(data.price_24h),
    change24h: parseFloat(data.price_24h) - parseFloat(data.price_24h),
    changePercent24h: parseFloat(data.price_24h_change_percent),
    volume24h: parseFloat(data.volume_24h),
    high24h: parseFloat(data.high_24h),
    low24h: parseFloat(data.low_24h),
  };
}
