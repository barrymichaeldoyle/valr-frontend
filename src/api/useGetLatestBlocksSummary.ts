import { useQuery } from '@tanstack/react-query';

import type { Asset } from '../constants';

export type GetBlocksResponseItem = {
  height: number;
  hash: string;
  time: number;
};

export type GetBlocksResponse = GetBlocksResponseItem[];

export const LATEST_BLOCKS_QUERY_KEY = 'latestBlocks';

export function useGetLatestBlocksSummary(asset: Asset) {
  return useQuery<GetBlocksResponse>({
    queryKey: [LATEST_BLOCKS_QUERY_KEY, asset],
    queryFn: () => getLatestBlocks(asset),
  });
}

async function getLatestBlocks(asset: Asset): Promise<GetBlocksResponse> {
  if (asset === 'btc') {
    const todayBlocksRes = await fetch(
      `https://blockchain.info/blocks/${Date.now()}?format=json&cors=true`
    );
    const todayBlocks = (await todayBlocksRes.json()) as GetBlocksResponse;
    return todayBlocks.slice(0, 15);
  } else if (asset === 'eth') {
    // For Ethereum, we'll use Etherscan API
    // Note: You'll need to add an API key for production use
    const response = await fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=false`
    );
    const latestBlock = await response.json();

    // For now, we'll create a mock response with the latest block
    // In a real implementation, you'd want to fetch multiple blocks
    return [
      {
        height: parseInt(latestBlock.result.number, 16),
        hash: latestBlock.result.hash,
        time: parseInt(latestBlock.result.timestamp, 16),
      },
    ];
  } else {
    // For BCH or other assets, return empty array for now
    return [];
  }
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
