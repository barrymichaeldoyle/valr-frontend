import { describe, it, expect } from 'vitest';

import { satoshisToBTC } from './satoshisToBTC';

describe('satoshisToBTC', () => {
  it('should convert 1 satoshi to 0.00000001 BTC', () => {
    expect(satoshisToBTC(1)).toBe('0.00000001');
  });

  it('should convert 100 satoshis to 0.00000100 BTC', () => {
    expect(satoshisToBTC(100)).toBe('0.00000100');
  });

  it('should convert 1000 satoshis to 0.00001000 BTC', () => {
    expect(satoshisToBTC(1000)).toBe('0.00001000');
  });

  it('should convert 10000 satoshis to 0.00010000 BTC', () => {
    expect(satoshisToBTC(10000)).toBe('0.00010000');
  });

  it('should convert 100000 satoshis to 0.00100000 BTC', () => {
    expect(satoshisToBTC(100000)).toBe('0.00100000');
  });

  it('should convert 1000000 satoshis to 0.01000000 BTC', () => {
    expect(satoshisToBTC(1000000)).toBe('0.01000000');
  });

  it('should convert 10000000 satoshis to 0.10000000 BTC', () => {
    expect(satoshisToBTC(10000000)).toBe('0.10000000');
  });

  it('should convert 100000000 satoshis to 1.00000000 BTC', () => {
    expect(satoshisToBTC(100000000)).toBe('1.00000000');
  });

  it('should convert 9776762 satoshis to 0.09776762 BTC', () => {
    expect(satoshisToBTC(9776762)).toBe('0.09776762');
  });

  it('should convert 0 satoshis to 0.00000000 BTC', () => {
    expect(satoshisToBTC(0)).toBe('0.00000000');
  });

  it('should handle negative satoshis', () => {
    expect(satoshisToBTC(-100000000)).toBe('-1.00000000');
    expect(satoshisToBTC(-50000000)).toBe('-0.50000000');
  });

  it('should handle very large amounts', () => {
    expect(satoshisToBTC(2100000000000000)).toBe('21000000.00000000'); // 21 million BTC
  });

  it('should handle decimal satoshis (though this is not typical)', () => {
    expect(satoshisToBTC(100.5)).toBe('0.00000100');
  });

  it('should handle edge cases', () => {
    expect(satoshisToBTC(Number.MAX_SAFE_INTEGER)).toBe(
      (Number.MAX_SAFE_INTEGER / 100000000).toFixed(8)
    );
    expect(satoshisToBTC(Number.MIN_SAFE_INTEGER)).toBe(
      (Number.MIN_SAFE_INTEGER / 100000000).toFixed(8)
    );
  });
});
