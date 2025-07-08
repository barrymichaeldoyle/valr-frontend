import { useQuery } from '@tanstack/react-query';

import { identifyMinerFromCoinbase } from './utils/identifyMinerFromCoinbase';
import { loadMiningPoolsData } from './utils/loadMiningPoolsData';

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

export function useGetLastestBlockItemMiner(txHash: string) {
  return useQuery({
    queryKey: getLastestBlockItemMinerQueryKey(txHash),
    queryFn: () => getMiner(txHash),
  });
}

async function getMiner(txHash: string): Promise<string> {
  /**
   * Fetching the tx data and the mining pools data in parallel
   * since they are independent of each other
   */
  const [txData, poolsData] = await Promise.all([
    fetch(`https://blockchain.info/rawtx/${txHash}?format=json&cors=true`).then(
      response => response.json()
    ),
    loadMiningPoolsData(),
  ]);

  const minerName = identifyMinerFromCoinbase(txData, poolsData);

  return minerName;
}
