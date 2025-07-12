import { useQuery } from '@tanstack/react-query';
import Big from 'big.js';

import type { BlockDetails } from '../../../../api';

export type LatestBlock = {
  block_index: number;
  hash: string;
  height: number;
  time: number;
  tx_indexes: number[];
};

export function getConfirmationsQueryKey(blockDetails: BlockDetails) {
  return ['confirmations', blockDetails.hash];
}

export function useGetConfirmations(blockDetails: BlockDetails) {
  return useQuery({
    queryKey: getConfirmationsQueryKey(blockDetails),
    queryFn: () => getConfirmations(blockDetails),
  });
}

async function getLatestBlock() {
  const response = await fetch(
    `https://blockchain.info/latestblock?format=json&cors=true`
  );
  const data = await response.json();

  return data;
}

async function getConfirmations(blockDetails: BlockDetails): Promise<number> {
  const latestBlock = await getLatestBlock();

  const currentBlockHeight = latestBlock.height;

  const confirmations = new Big(currentBlockHeight)
    .minus(blockDetails.height)
    .plus(1);

  return confirmations.toNumber();
}
