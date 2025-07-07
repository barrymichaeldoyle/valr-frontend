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

// const latestBlockDetails = await Promise.all(
//   latestBlocks.map(async (blockSummary: GetBlocksResponseItem) => {
//     const blockDetailsRes = await fetch(
//       `https://blockchain.info/rawblock/${blockSummary.hash}?format=json&cors=true`
//     );
//     const blockDetails =
//       (await blockDetailsRes.json()) as GetSingleBlockResponse;

//     return {
//       height: blockSummary.height,
//       hash: blockSummary.hash,
//       time: blockSummary.time,
//       size: blockDetails.size,
//       miner: 'Unknown',
//     } as GetLatestBlocksResponseItem;
//   })
// );
