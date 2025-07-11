/**
 * This file contains reusable atomic types from the blockchain API.
 */

export type Output = {
  addr?: string;
  n: number;
  script: string;
  spending_outpoints: SpendingOutpoint[];
  spent: boolean;
  tx_index: number;
  type: number;
  value: number;
};

type SpendingOutpoint = {
  n: number;
  tx_index: number;
};
