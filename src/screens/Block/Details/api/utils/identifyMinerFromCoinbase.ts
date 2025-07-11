import type { MiningPoolsData } from '../../../../../api';
import { UNKNOWN_MINER_FALLBACK_TEXT } from '../../../../../constants';

/**
 * Identify the miner from the coinbase script
 * @param txData - The transaction data
 * @param poolsData - The mining pools data
 * @returns The miner name or the fallback text if the miner is not found
 */
export function identifyMinerFromCoinbase(
  poolsData: MiningPoolsData,
  coinbaseScript?: string
): string {
  if (!coinbaseScript || !poolsData?.coinbase_tags) {
    return UNKNOWN_MINER_FALLBACK_TEXT;
  }

  /**
   * First, try to decode hex-encoded data
   * If the script is not hex-encoded, use the original script
   */
  let decodedScript = coinbaseScript;
  if (coinbaseScript.match(/^[0-9a-fA-F]+$/)) {
    try {
      // Convert hex to string
      decodedScript = coinbaseScript
        .match(/.{1,2}/g)!
        .map(byte => String.fromCharCode(parseInt(byte, 16)))
        .join('');
    } catch {
      console.error('Failed to decode hex script:', coinbaseScript);
    }
  }

  /**
   * Check against our pools.json file
   */
  for (const [tag, poolInfo] of Object.entries(poolsData.coinbase_tags)) {
    if (decodedScript.toLowerCase().includes(tag.toLowerCase())) {
      return poolInfo.name || tag;
    }
  }

  /**
   * If no pool is found, log a warning and return the fallback text
   * If you see the warning, check if the pool name in the decoded script
   * exists online and add it to the pools.json file.
   */
  console.warn('[MinerDebug] pool not found for decodedScript:', decodedScript);

  return UNKNOWN_MINER_FALLBACK_TEXT;
}
