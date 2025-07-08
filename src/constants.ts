export const ASSETS = ['btc', 'eth', 'bch'] as const;
export type Asset = (typeof ASSETS)[number];

export const UNKNOWN_MINER_FALLBACK_TEXT = 'Unknown';
