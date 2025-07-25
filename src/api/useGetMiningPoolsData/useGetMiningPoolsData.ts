import { useQuery } from '@tanstack/react-query';

type PoolInfo = {
  name: string;
  link: string;
};

export type MiningPoolsData = {
  coinbase_tags: Record<string, PoolInfo>;
};

/**
 * Store the mining pools data in a global variable
 * to avoid fetching the data from the file on every request
 */
let miningPoolsData: MiningPoolsData | null = null;

/**
 * Load the comprehensive mining pool database from our stored pool.json file
 * @returns The mining pools data
 *
 * Note we've removed the payout_addresses from the data json file
 * because it's not used in the identifyMinerFromCoinbase function
 * or anywhere else in the codebase.
 * This significantly reduces the size of the data file.
 */
async function loadMiningPoolsData(): Promise<MiningPoolsData> {
  if (!miningPoolsData) {
    try {
      const response = await fetch('/pools.json');
      miningPoolsData = await response.json();
    } catch (error) {
      console.error('Failed to load mining pools data:', error);
      miningPoolsData = { coinbase_tags: {} };
    }
  }
  return miningPoolsData!;
}

export const MINING_POOLS_QUERY_KEY = 'miningPools';

export function useGetMiningPoolsData() {
  return useQuery<MiningPoolsData>({
    queryKey: [MINING_POOLS_QUERY_KEY],
    queryFn: loadMiningPoolsData,
    staleTime: Infinity, // Pools data rarely changes, so we can cache it indefinitely
    gcTime: Infinity,
  });
}
