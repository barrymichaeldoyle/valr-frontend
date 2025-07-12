import { useQuery } from '@tanstack/react-query';

export type LatestBlock = {
  block_index: number;
  hash: string;
  height: number;
  time: number;
  tx_indexes: number[];
};

export function getLatestBlockHeightQueryKey() {
  return ['latestBlockHeight'];
}

export function useGetLatestBlockHeight() {
  return useQuery({
    queryKey: getLatestBlockHeightQueryKey(),
    queryFn: () => getLatestBlockHeight(),
    staleTime: 60_000, // 1 minute
  });
}

async function getLatestBlock() {
  const response = await fetch(
    `https://blockchain.info/latestblock?format=json&cors=true`
  );
  const data = await response.json();

  return data;
}

async function getLatestBlockHeight(): Promise<number> {
  const latestBlock = await getLatestBlock();

  return latestBlock.height;
}
