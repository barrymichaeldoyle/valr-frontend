export const ASSETS = ['btc', 'eth', 'bch'] as const;
export type Asset = (typeof ASSETS)[number];
