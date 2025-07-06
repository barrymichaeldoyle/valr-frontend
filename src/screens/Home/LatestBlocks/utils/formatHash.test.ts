import { describe, it, expect } from 'vitest';
import { formatHash } from './formatHash';

describe('formatHash', () => {
  it('should format hash with leading zeros correctly', () => {
    const hash =
      '00000000000000000005ca55a40c80213c61e5dfc6a5c2d6d38263303ead1468';
    const result = formatHash(hash);
    expect(result).toBe('0..5ca55a40c80213c61e5dfc6a5c2d6d38263303ead1468');
  });

  it('should format hash with some leading zeros', () => {
    const hash =
      '0001234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    const result = formatHash(hash);
    expect(result).toBe(
      '0..1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    );
  });

  it('should format hash with no leading zeros', () => {
    const hash =
      '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    const result = formatHash(hash);
    expect(result).toBe(
      '0..1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    );
  });

  it('should handle hash with single leading zero', () => {
    const hash =
      '01234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    const result = formatHash(hash);
    expect(result).toBe(
      '0..1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    );
  });

  it('should handle all zeros hash', () => {
    const hash =
      '0000000000000000000000000000000000000000000000000000000000000000';
    const result = formatHash(hash);
    expect(result).toBe('0..');
  });

  it('should handle single zero', () => {
    const hash = '0';
    const result = formatHash(hash);
    expect(result).toBe('0..');
  });

  it('should handle empty string', () => {
    const hash = '';
    const result = formatHash(hash);
    expect(result).toBe('0..');
  });

  it('should handle hash with mixed leading characters', () => {
    const hash =
      '0000000000000000000000000000000000000000000000000000000000000001';
    const result = formatHash(hash);
    expect(result).toBe('0..1');
  });

  it('should handle hash with leading zeros followed by non-zero', () => {
    const hash =
      '000000000000000000000000000000000000000000000000000000000000abcd';
    const result = formatHash(hash);
    expect(result).toBe('0..abcd');
  });

  it('should handle hash starting with non-zero', () => {
    const hash =
      'a000000000000000000000000000000000000000000000000000000000000000';
    const result = formatHash(hash);
    expect(result).toBe(
      '0..a000000000000000000000000000000000000000000000000000000000000000'
    );
  });
});
