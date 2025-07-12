import { useQuery } from '@tanstack/react-query';

import type { Output } from '../../../../../api';

export type Transaction = {
  block_height: number;
  block_index: number;
  double_spend: boolean;
  fee: number;
  hash: string;
  inputs: {
    index: number;
    prev_out: Output;
    script: string;
    sequence: number;
    witness: string;
  }[];
  lock_time: number;
  out: Output[];
  relayed_by: string;
  size: number;
  time: number;
  tx_index: number;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  weight: number;
};

export type BlockDetails = {
  bits: number;
  block_index: number;
  fee: number;
  hash: string;
  height: number;
  main_chain: boolean;
  mrkl_root: string;
  n_tx: number;
  next_block: string[];
  nonce: number;
  prev_block: string;
  size: number;
  time: number;
  tx: Transaction[];
  ver: number;
  weight: number;
};

export function getBlockDetailsQueryKey(blockHash: string) {
  return ['blockDetails', blockHash];
}

export function useGetBlockDetails(blockHash: string) {
  return useQuery<BlockDetails>({
    queryKey: getBlockDetailsQueryKey(blockHash),
    queryFn: () => getBlockDetails(blockHash),
  });
}

async function getBlockDetails(blockHash: string): Promise<BlockDetails> {
  const response = await fetch(
    `https://blockchain.info/rawblock/${blockHash}?format=json&cors=true`
  );
  const data = await response.json();

  if (data.error === 'not-found-or-invalid-arg') {
    throw new Error('Block not found');
  }

  return data;
}
