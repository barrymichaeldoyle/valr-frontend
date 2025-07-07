import { useQuery } from '@tanstack/react-query';

export type GetSingleBlockResponse = {
  hash: string;
  ver: number;
  prev_block: string;
  mrkl_root: string;
  time: number;
  bits: number;
  nonce: number;
  n_tx: number;
  size: number;
  block_index: number;
  main_chain: boolean;
  height: number;
  received_time: number;
  relayed_by: string;
  tx: string[];
};

export function getBlockDetailsQueryKey(blockHash: string) {
  return ['blockDetails', blockHash];
}

export function useGetBlockDetails(blockHash: string) {
  return useQuery({
    queryKey: getBlockDetailsQueryKey(blockHash),
    queryFn: () => getBlockDetails(blockHash),
  });
}

async function getBlockDetails(
  blockHash: string
): Promise<GetSingleBlockResponse> {
  const response = await fetch(
    `https://blockchain.info/rawblock/${blockHash}?format=json&cors=true`
  );
  return (await response.json()) as GetSingleBlockResponse;
}
