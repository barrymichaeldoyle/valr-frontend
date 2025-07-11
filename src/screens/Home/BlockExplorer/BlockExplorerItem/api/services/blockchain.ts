import type { AssetSymbol } from '../types';

export async function getBlockchainAssetPrice(
  symbol: AssetSymbol
): Promise<number> {
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

  return parseFloat(data.price_24h);
}
