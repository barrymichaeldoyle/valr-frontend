import type { AssetSymbol } from '../types';

const VALR_SYMBOL_MAP: Record<AssetSymbol, string | undefined> = {
  'BTC-USD': 'BTCUSDC',
  'ETH-USD': 'ETHUSDC',
  /**
   * Note: VALR doesn't list BCH-USDC as a supported asset.
   * So I'm making sure not to make a call to the API for this asset.
   */
  'BCH-USD': undefined,
};

export async function getValrAssetPrice(symbol: AssetSymbol): Promise<number> {
  const valrSymbol = VALR_SYMBOL_MAP[symbol];

  if (!valrSymbol) {
    return 0;
  }

  const response = await fetch(
    `https://api.valr.com/v1/public/${valrSymbol}/marketsummary`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch price for ${symbol}: ${response.statusText}`
    );
  }

  const data = await response.json();

  return parseFloat(data.markPrice);
}
