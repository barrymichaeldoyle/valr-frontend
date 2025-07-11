import { describe, expect, it } from 'vitest';

import { UNKNOWN_FALLBACK_TEXT } from '../../../../../constants';
import type { BlockDetails } from '../../api';

import { calculateBlockReward } from './calculateBlockReward';

describe('calculateBlockReward', () => {
  function createMockBlockDetails(
    firstTransactionOutput: number,
    fee: number
  ): BlockDetails {
    return {
      bits: 0x1a44b9f2,
      block_index: 123456,
      fee,
      hash: '0000000000000000000000000000000000000000000000000000000000000000',
      height: 123456,
      main_chain: true,
      mrkl_root:
        '0000000000000000000000000000000000000000000000000000000000000000',
      n_tx: 1,
      next_block: [],
      nonce: 123456,
      prev_block:
        '0000000000000000000000000000000000000000000000000000000000000000',
      size: 1000,
      time: 1234567890,
      tx: [
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
              addr: 'test-address',
              n: 0,
              script: 'test-script',
              spending_outpoints: [],
              spent: false,
              tx_index: 0,
              type: 0,
              value: firstTransactionOutput,
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
      ver: 1,
      weight: 1000,
    };
  }

  describe('Normal block reward calculations', () => {
    it('should calculate block reward for typical Bitcoin block', () => {
      // Typical Bitcoin block reward: 6.25 BTC + fees
      const firstTransactionOutput = 625000000; // 6.25 BTC in satoshis
      const fee = 5000; // 0.00005 BTC in satoshis
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('6.24995000 BTC');
    });

    it('should calculate block reward with higher fees', () => {
      const firstTransactionOutput = 625000000; // 6.25 BTC in satoshis
      const fee = 50000; // 0.0005 BTC in satoshis
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('6.24950000 BTC');
    });

    it('should calculate block reward with very small fees', () => {
      const firstTransactionOutput = 625000000; // 6.25 BTC in satoshis
      const fee = 100; // 0.000001 BTC in satoshis
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('6.24999900 BTC');
    });
  });

  describe('Precision testing with Big.js', () => {
    it('should handle very large satoshi values with precision', () => {
      // Test with very large numbers to ensure Big.js precision
      const firstTransactionOutput = 999999999999999; // Very large satoshi value
      const fee = 123456789; // Large fee
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toMatch(/^\d+\.\d{8} BTC$/);
      expect(result).not.toBe('NaN BTC');
    });

    it('should handle very small differences with precision', () => {
      const firstTransactionOutput = 625000001; // 6.25000001 BTC in satoshis
      const fee = 1; // 0.00000001 BTC in satoshis
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('6.25000000 BTC');
    });

    it('should handle zero fees', () => {
      const firstTransactionOutput = 625000000; // 6.25 BTC in satoshis
      const fee = 0;
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('6.25000000 BTC');
    });
  });

  describe('Edge cases', () => {
    it('should handle fees larger than first transaction output', () => {
      const firstTransactionOutput = 1000000; // 0.01 BTC in satoshis
      const fee = 2000000; // 0.02 BTC in satoshis (larger than output)
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('-0.01000000 BTC');
    });

    it('should handle equal output and fee', () => {
      const firstTransactionOutput = 625000000; // 6.25 BTC in satoshis
      const fee = 625000000; // Same as output
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('0.00000000 BTC');
    });

    it('should handle very small output and fee', () => {
      const firstTransactionOutput = 1; // 0.00000001 BTC in satoshis
      const fee = 0;
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('0.00000001 BTC');
    });
  });

  describe('Error handling', () => {
    it('should return unknown fallback when first transaction output is missing', () => {
      const blockDetails: BlockDetails = {
        ...createMockBlockDetails(625000000, 5000),
        tx: [
          {
            ...createMockBlockDetails(625000000, 5000).tx[0],
            out: [], // No outputs
          },
        ],
      };

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe(UNKNOWN_FALLBACK_TEXT);
    });

    it('should return unknown fallback when first transaction is missing', () => {
      const blockDetails: BlockDetails = {
        ...createMockBlockDetails(625000000, 5000),
        tx: [], // No transactions
      };

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe(UNKNOWN_FALLBACK_TEXT);
    });

    it('should return unknown fallback when first transaction output value is falsy', () => {
      // Test with a value that will be treated as falsy by the function
      const blockDetails = createMockBlockDetails(0, 5000);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe(UNKNOWN_FALLBACK_TEXT);
    });
  });

  describe('Format verification', () => {
    it('should return result in correct format', () => {
      const firstTransactionOutput = 625000000; // 6.25 BTC in satoshis
      const fee = 5000; // 0.00005 BTC in satoshis
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toMatch(/^\d+\.\d{8} BTC$/);
    });

    it('should handle negative results correctly', () => {
      const firstTransactionOutput = 1000000; // 0.01 BTC in satoshis
      const fee = 2000000; // 0.02 BTC in satoshis
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toMatch(/^-\d+\.\d{8} BTC$/);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle Bitcoin halving scenarios', () => {
      // Pre-halving block reward (12.5 BTC)
      const firstTransactionOutput = 1250000000; // 12.5 BTC in satoshis
      const fee = 10000; // 0.0001 BTC in satoshis
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('12.49990000 BTC');
    });

    it('should handle very high fee scenarios', () => {
      const firstTransactionOutput = 625000000; // 6.25 BTC in satoshis
      const fee = 100000000; // 1 BTC in satoshis (very high fee)
      const blockDetails = createMockBlockDetails(firstTransactionOutput, fee);

      const result = calculateBlockReward(blockDetails);

      expect(result).toBe('5.25000000 BTC');
    });
  });
});
