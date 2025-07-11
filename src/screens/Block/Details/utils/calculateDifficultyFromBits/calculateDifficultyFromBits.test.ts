import { describe, expect, it } from 'vitest';

import { calculateDifficultyFromBits } from './calculateDifficultyFromBits';

describe('calculateDifficultyFromBits', () => {
  describe('Normal difficulty calculations', () => {
    it('should calculate difficulty for typical Bitcoin block bits', () => {
      // Real Bitcoin block example: bits = 0x1a44b9f2
      const bits = 0x1a44b9f2;
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/); // Should be formatted with commas
    });

    it('should calculate difficulty for high difficulty block', () => {
      // More recent Bitcoin block with higher difficulty
      const bits = 0x1a0377ae;
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });

    it('should calculate difficulty for Genesis block', () => {
      // Bitcoin Genesis block bits - should give difficulty = 1
      const bits = 0x1d00ffff;
      const result = calculateDifficultyFromBits(bits);

      expect(result).toBe('1');
    });
  });

  describe('Edge cases with exponent <= 3', () => {
    it('should handle exponent = 3', () => {
      const bits = 0x03123456; // exponent = 3, mantissa = 0x123456
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });

    it('should handle exponent = 2', () => {
      const bits = 0x02123456; // exponent = 2, mantissa = 0x123456
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });

    it('should handle exponent = 1', () => {
      const bits = 0x01123456; // exponent = 1, mantissa = 0x123456
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });
  });

  describe('Edge cases with exponent > 3', () => {
    it('should handle large exponent values', () => {
      const bits = 0x20123456; // exponent = 32, mantissa = 0x123456
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });

    it('should handle exponent = 4', () => {
      const bits = 0x04123456; // exponent = 4, mantissa = 0x123456
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });
  });

  describe('Mantissa variations', () => {
    it('should handle minimum mantissa', () => {
      const bits = 0x1d000001; // Small mantissa
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });

    it('should handle maximum mantissa', () => {
      const bits = 0x1dffffff; // Maximum mantissa (0xffffff)
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
    });
  });

  describe('Mathematical accuracy', () => {
    it('should calculate known difficulty correctly', () => {
      // Test with known values where we can verify the math
      const bits = 0x1d00ffff; // This should give difficulty = 1
      const result = calculateDifficultyFromBits(bits);

      expect(result).toBe('1');
    });

    it('should handle very small target (high difficulty)', () => {
      const bits = 0x1a000001; // Very small target
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
      // Should be a large number with commas
      expect(result).toMatch(/,/);
    });
  });

  describe('Rounding behavior', () => {
    it('should round difficulty to 2 decimal places', () => {
      const bits = 0x1d00fffe; // Slightly different from genesis
      const result = calculateDifficultyFromBits(bits);

      // Should not have more than 2 decimal places
      const decimalPart = result.split('.')[1];
      if (decimalPart) {
        expect(decimalPart.length).toBeLessThanOrEqual(2);
      }
    });
  });

  describe('Format verification', () => {
    it('should format large numbers with commas', () => {
      const bits = 0x1a123456; // Should produce a large difficulty
      const result = calculateDifficultyFromBits(bits);

      expect(result).toMatch(/,/); // Should contain commas
      expect(typeof result).toBe('string');
    });

    it('should handle small numbers without commas', () => {
      const bits = 0x1d00ffff; // Difficulty = 1
      const result = calculateDifficultyFromBits(bits);

      expect(result).toBe('1');
    });
  });

  describe('Error handling', () => {
    it('should handle zero bits', () => {
      const bits = 0x00000000;

      expect(() => calculateDifficultyFromBits(bits)).not.toThrow();
      const result = calculateDifficultyFromBits(bits);
      expect(typeof result).toBe('string');
    });

    it('should handle edge case with zero mantissa', () => {
      const bits = 0x1d000000; // Zero mantissa

      expect(() => calculateDifficultyFromBits(bits)).not.toThrow();
    });
  });

  describe('Real Bitcoin block examples', () => {
    it('should handle recent Bitcoin block bits', () => {
      // Example from a recent Bitcoin block
      const bits = 0x1a01aa3d;
      const result = calculateDifficultyFromBits(bits);

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[\d,]+\.?\d*$/);
      expect(result).toMatch(/,/); // Should be large enough to have commas
    });
  });
});
