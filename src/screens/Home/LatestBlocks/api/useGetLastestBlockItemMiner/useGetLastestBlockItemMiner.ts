import { useQuery } from '@tanstack/react-query';

import type { MiningPoolsData, Output } from '../../../../../api';
import { identifyMinerFromCoinbase } from '../../../../Block/Details/api/utils/identifyMinerFromCoinbase';

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
    prev_out: Output;
  }[];
  out: Output[];
};

export function getLatestBlockItemMinerQueryKey(txHash: string) {
  return ['lastestBlockItemMiner', txHash];
}

export function useGetLatestBlockItemMiner(
  txHash: string,
  poolsData: MiningPoolsData | undefined
) {
  return useQuery({
    queryKey: getLatestBlockItemMinerQueryKey(txHash),
    queryFn: () => getLatestBlockItemMiner(txHash, poolsData!),
    enabled: !!poolsData, // Only run the query when pools data is available
  });
}

async function getLatestBlockItemMiner(
  txHash: string,
  poolsData: MiningPoolsData
): Promise<string> {
  const txData = await fetch(
    `https://blockchain.info/rawtx/${txHash}?format=json&cors=true`
  ).then(response => response.json());

  const minerName = identifyMinerFromCoinbase(
    poolsData,
    txData.inputs[0]?.script
  );

  return minerName;
}
