import { useQuery } from '@tanstack/react-query';

export type Transaction = {
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
  inputs: TransactionInput[];
  out: TransactionOutput[];
};

export type TransactionInput = {
  sequence: number;
  witness: string;
  prev_out: {
    hash: string;
    value: number;
    tx_index: number;
    n: number;
  };
  script: string;
};

export type TransactionOutput = {
  value: number;
  hash: string;
  script: string;
  spent: boolean;
  tx_index: number;
  n: number;
  addr?: string;
};

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
  tx: Transaction[];
  miner?: string;
};

// Mining pool data structure
type PoolInfo = {
  name: string;
  link: string;
};

type MiningPoolsData = {
  coinbase_tags: Record<string, PoolInfo>;
  payout_addresses: Record<string, PoolInfo>;
};

// Load the comprehensive mining pool database from blockchain.com
let miningPoolsData: MiningPoolsData | null = null;

async function loadMiningPoolsData(): Promise<MiningPoolsData> {
  if (!miningPoolsData) {
    try {
      const response = await fetch('/pools.json');
      miningPoolsData = await response.json();
    } catch (error) {
      console.error('Failed to load mining pools data:', error);
      miningPoolsData = { coinbase_tags: {}, payout_addresses: {} };
    }
  }
  return miningPoolsData!;
}

/**
 * Normalize pool names to match blockchain.com's display format
 * @param poolName - The pool name to normalize
 * @returns The normalized pool name
 */
function normalizePoolName(poolName: string): string {
  const normalizations: Record<string, string> = {
    'Braiins Pool': 'Braiins',
    'BTC.com': 'BTC.com',
    'Binance Pool': 'Binance Pool',
    'Foundry USA': 'Foundry USA',
    AntPool: 'AntPool',
    F2Pool: 'F2Pool',
    ViaBTC: 'ViaBTC',
    Poolin: 'Poolin',
    Luxor: 'Luxor',
    'SBI Crypto': 'SBI Crypto',
    'Marathon Digital': 'Marathon Digital',
    'Core Scientific': 'Core Scientific',
    'Riot Blockchain': 'Riot Blockchain',
    'Hut 8': 'Hut 8',
    Bitfarms: 'Bitfarms',
  };

  return normalizations[poolName] || poolName;
}

function identifyMinerFromCoinbase(
  coinbaseScript: string,
  poolsData: MiningPoolsData
): string {
  if (!coinbaseScript || !poolsData?.coinbase_tags) {
    return 'Unknown';
  }

  // First, try to decode hex-encoded data
  let decodedScript = coinbaseScript;
  if (coinbaseScript.match(/^[0-9a-fA-F]+$/)) {
    try {
      // Convert hex to string
      decodedScript = coinbaseScript
        .match(/.{1,2}/g)!
        .map(byte => String.fromCharCode(parseInt(byte, 16)))
        .join('');
    } catch {
      console.error('Failed to decode hex script:', coinbaseScript);
    }
  }

  const scriptLower = decodedScript.toLowerCase();

  // Check against the comprehensive coinbase tags database
  for (const [tag, poolInfo] of Object.entries(poolsData.coinbase_tags)) {
    if (scriptLower.includes(tag.toLowerCase())) {
      return normalizePoolName(poolInfo.name || tag);
    }
  }

  // Try to extract any readable text (ASCII) as fallback
  const asciiMatch = decodedScript.match(/[a-zA-Z0-9\s]+/g);
  if (asciiMatch && asciiMatch.length > 0) {
    const readableText = asciiMatch.join(' ').trim();

    // Only return readable text if it looks like a proper mining pool name
    // Check for common patterns that indicate it's not a valid pool name
    const suspiciousPatterns = [
      /^\d+\s/, // Starts with number + space
      /\s\d+$/, // Ends with space + number
      /^[a-z]\s/, // Starts with single letter + space
      /\s[a-z]$/, // Ends with space + single letter
      /[a-z]{1,2}\s[a-z]{1,2}/, // Very short words
      /^[a-z]{1,3}\s/, // Very short word at start
      /\s[a-z]{1,3}$/, // Very short word at end
    ];

    const isSuspicious = suspiciousPatterns.some(pattern =>
      pattern.test(readableText)
    );

    if (readableText.length > 3 && !isSuspicious && readableText.length <= 30) {
      return readableText;
    }
  }

  return 'Unknown';
}

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
  const responseJson = (await response.json()) as GetSingleBlockResponse;

  // Load mining pools data
  const poolsData = await loadMiningPoolsData();

  // Extract miner information from coinbase transaction
  if (responseJson.tx && responseJson.tx.length > 0) {
    const coinbaseTx = responseJson.tx[0]; // First transaction is always coinbase
    if (coinbaseTx.inputs && coinbaseTx.inputs.length > 0) {
      const coinbaseInput = coinbaseTx.inputs[0];
      if (coinbaseInput.script) {
        responseJson.miner = identifyMinerFromCoinbase(
          coinbaseInput.script,
          poolsData
        );
      }
    }
  }

  return responseJson;
}
