/**
 * Convert satoshis to BTC.
 * @param satoshis - The amount in satoshis.
 * @returns The amount in BTC as a formatted string.
 */
export function satoshisToBTC(satoshis: number): string {
  const btc = satoshis / 100_000_000;
  return btc.toFixed(8);
}
