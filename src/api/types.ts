/**
 * This file contains reusable atomic types from the blockchain API.
 */

export type Output = {
  addr?: string;
  n: number;
  script: string;
  spending_outpoints: SpendingOutpoint[];
  spent: boolean;
};

type SpendingOutpoint = {
  n: number;
  tx_index: number;
};
