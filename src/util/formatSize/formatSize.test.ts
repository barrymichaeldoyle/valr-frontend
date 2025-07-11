import { describe, it, expect } from 'vitest';

import { formatSize } from './formatSize';

describe('formatSize', () => {
  it('should format 0 bytes', () => {
    expect(formatSize(0)).toBe('0 bytes');
  });

  it('should format 1 byte', () => {
    expect(formatSize(1)).toBe('1 byte');
  });

  it('should format small byte amounts', () => {
    expect(formatSize(10)).toBe('10 bytes');
    expect(formatSize(100)).toBe('100 bytes');
    expect(formatSize(999)).toBe('999 bytes');
  });

  it('should format thousands with commas', () => {
    expect(formatSize(1000)).toBe('1,000 bytes');
    expect(formatSize(10000)).toBe('10,000 bytes');
    expect(formatSize(100000)).toBe('100,000 bytes');
    expect(formatSize(1000000)).toBe('1,000,000 bytes');
  });

  it('should format large numbers', () => {
    expect(formatSize(1234567)).toBe('1,234,567 bytes');
    expect(formatSize(999999999)).toBe('999,999,999 bytes');
  });

  it('should handle negative numbers', () => {
    expect(formatSize(-1)).toBe('-1 byte');
    expect(formatSize(-10)).toBe('-10 bytes');
    expect(formatSize(-1000)).toBe('-1,000 bytes');
  });

  it('should handle decimal numbers', () => {
    expect(formatSize(1.5)).toBe('1.5 bytes');
    expect(formatSize(10.25)).toBe('10.25 bytes');
    expect(formatSize(1000.75)).toBe('1,000.75 bytes');
  });

  it('should handle very large numbers', () => {
    expect(formatSize(Number.MAX_SAFE_INTEGER)).toBe(
      '9,007,199,254,740,991 bytes'
    );
  });

  it('should handle very small numbers', () => {
    expect(formatSize(Number.MIN_SAFE_INTEGER)).toBe(
      '-9,007,199,254,740,991 bytes'
    );
  });

  it('should handle edge cases', () => {
    expect(formatSize(Number.MAX_VALUE)).toBe(
      '179,769,313,486,231,570,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000 bytes'
    );
    expect(formatSize(Number.MIN_VALUE)).toBe('0 bytes');
    expect(formatSize(Infinity)).toBe('∞ bytes');
    expect(formatSize(-Infinity)).toBe('-∞ bytes');
    expect(formatSize(NaN)).toBe('NaN bytes');
  });
});
