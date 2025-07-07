import { useQuery } from '@tanstack/react-query';

export type GetBlocksResponseItem = {
  height: number;
  hash: string;
  time: number;
};

export type GetBlocksResponse = GetBlocksResponseItem[];

export const LATEST_BLOCKS_QUERY_KEY = 'latestBlocks';

export function useGetLatestBlocksSummary() {
  return useQuery<GetBlocksResponse>({
    queryKey: [LATEST_BLOCKS_QUERY_KEY],
    queryFn: getLatestBlocks,
  });
}

async function getLatestBlocks(): Promise<GetBlocksResponse> {
  const todayBlocksRes = await fetch(
    `https://blockchain.info/blocks/${Date.now()}?format=json&cors=true`
  );
  const todayBlocks = (await todayBlocksRes.json()) as GetBlocksResponse;

  const latestBlocks = todayBlocks.slice(0, 15);

  return latestBlocks;
}
