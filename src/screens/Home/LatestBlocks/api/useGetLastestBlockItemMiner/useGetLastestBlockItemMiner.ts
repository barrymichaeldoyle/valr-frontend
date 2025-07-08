import { useQuery } from '@tanstack/react-query';

import type { MiningPoolsData } from '../useGetMiningPoolsData/useGetMiningPoolsData';

import { identifyMinerFromCoinbase } from './utils/identifyMinerFromCoinbase';

export type GetSingleTransactionResponse = {
  hash: string;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  size: number;
  weight: number;
  fee: number;
  relayed_by: string;
  lock_time: number;
  tx_index: number;
  double_spend: boolean;
  time: number;
  block_index: number;
  block_height: number;
  inputs: {
    sequence: number;
    witness: string;
    script: string;
    index: number;
    prev_out: {
      type: number;
      spent: boolean;
      value: number;
      spending_outpoints: { tx_index: number; n: number }[];
      n: number;
      tx_index: number;
      script: string;
    };
  }[];
  out: {
    type: number;
    spent: false;
    value: number;
    spending_outpoints: [];
    n: number;
    tx_index: number;
    script: string;
    addr: string;
  }[];
};

export function getLastestBlockItemMinerQueryKey(txHash: string) {
  return ['lastestBlockItemMiner', txHash];
}

export function useGetLastestBlockItemMiner(
  txHash: string,
  poolsData: MiningPoolsData | undefined
) {
  return useQuery({
    queryKey: getLastestBlockItemMinerQueryKey(txHash),
    queryFn: () => getMiner(txHash, poolsData!),
    enabled: !!poolsData, // Only run the query when pools data is available
  });
}

async function getMiner(
  txHash: string,
  poolsData: MiningPoolsData
): Promise<string> {
  const txData = await fetch(
    `https://blockchain.info/rawtx/${txHash}?format=json&cors=true`
  ).then(response => response.json());

  const minerName = identifyMinerFromCoinbase(txData, poolsData);

  return minerName;
}
