import { describe, it, expect } from 'vitest';

import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('should format small integers correctly', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(123)).toBe('123');
    expect(formatNumber(999)).toBe('999');
  });

  it('should format large integers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(12345)).toBe('12,345');
    expect(formatNumber(123456)).toBe('123,456');
    expect(formatNumber(1234567)).toBe('1,234,567');
    expect(formatNumber(12345678)).toBe('12,345,678');
    expect(formatNumber(123456789)).toBe('123,456,789');
  });

  it('should format decimal numbers correctly', () => {
    expect(formatNumber(0.5)).toBe('0.5');
    expect(formatNumber(1.25)).toBe('1.25');
    expect(formatNumber(123.456)).toBe('123.456');
    expect(formatNumber(1234.567)).toBe('1,234.567');
    expect(formatNumber(12345.6789)).toBe('12,345.679');
  });

  it('should handle negative numbers', () => {
    expect(formatNumber(-1)).toBe('-1');
    expect(formatNumber(-123)).toBe('-123');
    expect(formatNumber(-1234)).toBe('-1,234');
    expect(formatNumber(-123.456)).toBe('-123.456');
    expect(formatNumber(-1234.567)).toBe('-1,234.567');
  });

  it('should handle zero correctly', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(0.0)).toBe('0');
    expect(formatNumber(-0)).toBe('-0');
  });

  it('should handle very large numbers', () => {
    expect(formatNumber(999999999)).toBe('999,999,999');
    expect(formatNumber(1000000000)).toBe('1,000,000,000');
    expect(formatNumber(1234567890123)).toBe('1,234,567,890,123');
  });

  it('should handle very small decimal numbers', () => {
    expect(formatNumber(0.001)).toBe('0.001');
    expect(formatNumber(0.0001)).toBe('0');
    expect(formatNumber(0.123456789)).toBe('0.123');
  });

  it('should handle numbers with many decimal places', () => {
    expect(formatNumber(1.123456789)).toBe('1.123');
    expect(formatNumber(1234.123456789)).toBe('1,234.123');
  });

  it('should handle scientific notation input', () => {
    // JavaScript converts scientific notation to regular numbers
    expect(formatNumber(1e3)).toBe('1,000');
    expect(formatNumber(1.5e6)).toBe('1,500,000');
    expect(formatNumber(1.23e-3)).toBe('0.001');
  });

  it('should handle Infinity and NaN', () => {
    expect(formatNumber(Infinity)).toBe('∞');
    expect(formatNumber(-Infinity)).toBe('-∞');
    expect(formatNumber(NaN)).toBe('NaN');
  });

  it('should maintain consistent formatting across different locales', () => {
    // Test that the function always uses en-US locale regardless of system locale
    const testNumber = 1234567.89;
    const result = formatNumber(testNumber);

    // Should always use US formatting (commas for thousands, periods for decimals)
    expect(result).toBe('1,234,567.89');

    // Verify it's not using system locale by checking it doesn't match other locales
    expect(result).not.toBe('1.234.567,89'); // German format
    expect(result).not.toBe('1 234 567,89'); // French format
  });

  it('should handle edge cases with floating point precision', () => {
    expect(formatNumber(0.1 + 0.2)).toBe('0.3');
    expect(formatNumber(Number.MAX_SAFE_INTEGER)).toBe('9,007,199,254,740,991');
    expect(formatNumber(Number.MIN_SAFE_INTEGER)).toBe(
      '-9,007,199,254,740,991'
    );
  });

  it('should handle numbers with trailing zeros', () => {
    expect(formatNumber(1000.0)).toBe('1,000');
    expect(formatNumber(1000.1)).toBe('1,000.1');
    expect(formatNumber(1000.1)).toBe('1,000.1');
  });

  it('should handle numbers with leading zeros in decimal part', () => {
    expect(formatNumber(1.001)).toBe('1.001');
    expect(formatNumber(1.0001)).toBe('1');
    expect(formatNumber(1.00001)).toBe('1');
  });

  it('should format currency-like numbers correctly', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56');
    expect(formatNumber(12345.67)).toBe('12,345.67');
    expect(formatNumber(123456.78)).toBe('123,456.78');
  });

  it('should handle numbers that are exactly at comma boundaries', () => {
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(999999)).toBe('999,999');
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
});
