import { useQuery } from '@tanstack/react-query';

export type GetBlocksResponseItem = {
  height: number;
  hash: string;
  time: number;
};

export type GetBlocksResponse = GetBlocksResponseItem[];

export type GetBlockSummaryResponseItem = {
  hash: string;
  height: number;
  mainchain: boolean;
  previous: string;
  time: number;
  version: number;
  bits: number;
  size: number;
  tx: string[];
  merkle: string;
  subsidy: number;
  fees: number;
  outputs: number;
  work: number;
  weight: number;
};

export type GetBlockSummaryResponse = GetBlockSummaryResponseItem[];

export const LATEST_BLOCKS_QUERY_KEY = 'latestBlocks';

export function useGetLatestBlocksSummary() {
  return useQuery<GetBlockSummaryResponse>({
    queryKey: [LATEST_BLOCKS_QUERY_KEY],
    queryFn: getLatestBlocks,
  });
}

async function getLatestBlocks(): Promise<GetBlockSummaryResponse> {
  const latestBlocksRes = await fetch(
    `https://blockchain.info/blocks/${Date.now()}?format=json&cors=true`
  );
  const latestBlocks = (await latestBlocksRes.json()) as GetBlocksResponse;

  const fifteenMostRecentBlocks = latestBlocks.slice(0, 15);

  const blockHeightsStringParam = fifteenMostRecentBlocks
    .map(block => block.height)
    .join(',');

  const blockSummariesRes = await fetch(
    `https://api.blockchain.info/haskoin-store/btc/block/heights?heights=${blockHeightsStringParam}&notx=true&cors=true`
  );

  const blockSummaries =
    (await blockSummariesRes.json()) as GetBlockSummaryResponse;

  return blockSummaries;
}
