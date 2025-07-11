import { describe, expect, it } from 'vitest';

import type { BlockDetails } from '../../api';

import { calculateTransactionVolume } from './calculateTransactionVolume';

describe('calculateTransactionVolume', () => {
  function createMockBlockDetails(
    coinbaseOutput: number,
    regularTransactions: Array<{ outputs: number[] }>
  ): BlockDetails {
    return {
      bits: 0x1a44b9f2,
      block_index: 123456,
      fee: 5000,
      hash: '0000000000000000000000000000000000000000000000000000000000000000',
      height: 123456,
      main_chain: true,
      mrkl_root:
        '0000000000000000000000000000000000000000000000000000000000000000',
      n_tx: 1 + regularTransactions.length,
      next_block: [],
      nonce: 123456,
      prev_block:
        '0000000000000000000000000000000000000000000000000000000000000000',
      size: 1000,
      time: 1234567890,
      tx: [
        // Coinbase transaction (first transaction)
        {
          block_height: 123456,
          block_index: 0,
          double_spend: false,
          fee: 0,
          hash: '0000000000000000000000000000000000000000000000000000000000000000',
          inputs: [],
          lock_time: 0,
          out: [
            {
              addr: 'coinbase-address',
              n: 0,
              script: 'coinbase-script',
              spending_outpoints: [],
              spent: false,
              tx_index: 0,
              type: 0,
              value: coinbaseOutput,
            },
          ],
          relayed_by: 'test',
          size: 1000,
          time: 1234567890,
          tx_index: 0,
          ver: 1,
          vin_sz: 0,
          vout_sz: 1,
          weight: 1000,
        },
        // Regular transactions
        ...regularTransactions.map((tx, index) => ({
          block_height: 123456,
          block_index: index + 1,
          double_spend: false,
          fee: 1000,
          hash: `tx-${index + 1}-hash`,
          inputs: [],
          lock_time: 0,
          out: tx.outputs.map((value, outputIndex) => ({
            addr: `address-${index + 1}-${outputIndex}`,
            n: outputIndex,
            script: `script-${index + 1}-${outputIndex}`,
            spending_outpoints: [],
            spent: false,
            tx_index: index + 1,
            type: 0,
            value,
          })),
          relayed_by: 'test',
          size: 1000,
          time: 1234567890,
          tx_index: index + 1,
          ver: 1,
          vin_sz: 0,
          vout_sz: tx.outputs.length,
          weight: 1000,
        })),
      ],
      ver: 1,
      weight: 1000,
    };
  }

  describe('Normal transaction volume calculations', () => {
    it('should calculate transaction volume excluding coinbase for single regular transaction', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [100000000, 50000000] }, // 1 BTC + 0.5 BTC = 1.5 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('1.50000000 BTC');
    });

    it('should calculate transaction volume for multiple regular transactions', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [100000000, 50000000] }, // 1.5 BTC
        { outputs: [200000000, 75000000] }, // 2.75 BTC
        { outputs: [50000000] }, // 0.5 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('4.75000000 BTC');
    });

    it('should handle transactions with many outputs', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [10000000, 20000000, 30000000, 40000000, 50000000] }, // 1.5 BTC total
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('1.50000000 BTC');
    });
  });

  describe('Edge cases', () => {
    it('should return zero when only coinbase transaction exists', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions: Array<{ outputs: number[] }> = [];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('0.00000000 BTC');
    });

    it('should handle very small transaction amounts', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [1, 100, 1000] }, // 0.00000001 + 0.000001 + 0.00001 = 0.00001101 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('0.00001101 BTC');
    });

    it('should handle very large transaction amounts', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [999999999999999, 123456789] }, // Very large amounts
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toMatch(/^\d+\.\d{8} BTC$/);
      expect(result).not.toBe('NaN BTC');
    });

    it('should handle transactions with zero outputs', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [100000000] }, // 1 BTC
        { outputs: [] }, // No outputs
        { outputs: [50000000] }, // 0.5 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('1.50000000 BTC');
    });
  });

  describe('Precision testing with Big.js', () => {
    it('should handle precise calculations with many decimal places', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [625000001, 1] }, // 6.25000001 + 0.00000001 = 6.25000002 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('6.25000002 BTC');
    });

    it('should handle very small differences with precision', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [1, 1, 1, 1, 1] }, // 5 * 0.00000001 = 0.00000005 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('0.00000005 BTC');
    });
  });

  describe('Format verification', () => {
    it('should return result in correct format', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [100000000, 50000000] }, // 1.5 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toMatch(/^\d+\.\d{8} BTC$/);
    });

    it('should handle zero result correctly', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions: Array<{ outputs: number[] }> = [];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('0.00000000 BTC');
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical Bitcoin block with mixed transaction sizes', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = [
        { outputs: [1000000000, 500000000] }, // 10 BTC + 5 BTC = 15 BTC
        { outputs: [100000000, 25000000, 75000000] }, // 0.1 + 0.025 + 0.075 = 2 BTC
        { outputs: [50000000] }, // 0.5 BTC
        { outputs: [10000000, 20000000, 30000000] }, // 0.01 + 0.02 + 0.03 = 0.6 BTC
      ];
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('18.10000000 BTC');
    });

    it('should handle high-volume block with many small transactions', () => {
      const coinbaseOutput = 625000000; // 6.25 BTC
      const regularTransactions = Array.from({ length: 100 }, (_, i) => ({
        outputs: [1000000 + i * 1000], // 0.001 BTC + small increment
      }));
      const blockDetails = createMockBlockDetails(
        coinbaseOutput,
        regularTransactions
      );

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toMatch(/^\d+\.\d{8} BTC$/);
      // Should be approximately 0.1 BTC (100 * 0.001) plus small increments
      expect(parseFloat(result)).toBeGreaterThan(0.1);
    });
  });

  describe('Error handling', () => {
    it('should handle empty transactions array gracefully', () => {
      const blockDetails: BlockDetails = {
        ...createMockBlockDetails(625000000, []),
        tx: [],
      };

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('0.00000000 BTC');
    });

    it('should handle block with only coinbase transaction', () => {
      const blockDetails: BlockDetails = {
        ...createMockBlockDetails(625000000, []),
        tx: [
          {
            block_height: 123456,
            block_index: 0,
            double_spend: false,
            fee: 0,
            hash: 'coinbase-hash',
            inputs: [],
            lock_time: 0,
            out: [
              {
                addr: 'coinbase-address',
                n: 0,
                script: 'coinbase-script',
                spending_outpoints: [],
                spent: false,
                tx_index: 0,
                type: 0,
                value: 625000000,
              },
            ],
            relayed_by: 'test',
            size: 1000,
            time: 1234567890,
            tx_index: 0,
            ver: 1,
            vin_sz: 0,
            vout_sz: 1,
            weight: 1000,
          },
        ],
      };

      const result = calculateTransactionVolume(blockDetails);

      expect(result).toBe('0.00000000 BTC');
    });
  });
});
