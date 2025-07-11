import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { formatDateTime } from './formatDateTime';

describe('formatDateTime', () => {
  let originalTZ: string | undefined;

  beforeEach(() => {
    // Save original timezone and set to UTC for consistent tests
    originalTZ = process.env.TZ;
    process.env.TZ = 'UTC';
  });

  afterEach(() => {
    // Restore original timezone
    process.env.TZ = originalTZ;
  });

  it('should format timestamp correctly in UTC', () => {
    // January 1, 2024, 12:00:45 UTC
    const timestamp = 1704110445;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-01-01 12:00');
  });

  it('should format timestamp with zero padding', () => {
    // February 5, 2024, 09:05:00 UTC
    const timestamp = 1707123900;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-02-05 09:05');
  });

  it('should handle midnight correctly', () => {
    // January 1, 2024, 00:00:00 UTC
    const timestamp = 1704067200;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-01-01 00:00');
  });

  it('should handle end of day correctly', () => {
    // December 31, 2023, 23:59:00 UTC
    const timestamp = 1704067140;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2023-12-31 23:59');
  });

  it('should handle leap year correctly', () => {
    // February 29, 2024, 15:50:00 UTC
    const timestamp = 1709221800;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-02-29 15:50');
  });

  it('should handle single digit months and days', () => {
    // March 3, 2024, 07:47:00 UTC
    const timestamp = 1709452020;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-03-03 07:47');
  });

  it('should handle Unix epoch', () => {
    // January 1, 1970, 00:00:00 UTC
    const timestamp = 0;
    const result = formatDateTime(timestamp);
    expect(result).toBe('1970-01-01 00:00');
  });

  it('should handle negative timestamps', () => {
    // December 31, 1969, 23:59:00 UTC
    const timestamp = -60;
    const result = formatDateTime(timestamp);
    expect(result).toBe('1969-12-31 23:59');
  });

  it('should handle very large timestamps', () => {
    // Year 2038 problem test
    const timestamp = 2147483647;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2038-01-19 03:14');
  });

  it('should handle floating point timestamps', () => {
    // Should truncate decimal part
    const timestamp = 1704110445.999;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-01-01 12:00');
  });

  it('should always return correct format', () => {
    const timestamp = 1704110445;
    const result = formatDateTime(timestamp);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });

  it('should handle year boundaries', () => {
    // December 31, 2023, 23:59:59 UTC
    const timestamp = 1704067199;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2023-12-31 23:59');
  });

  it('should handle all zeros timestamp', () => {
    const timestamp = 0;
    const result = formatDateTime(timestamp);
    expect(result).toBe('1970-01-01 00:00');
  });

  it('should handle early morning hours', () => {
    // January 1, 2024, 00:55:00 UTC
    const timestamp = 1704070500;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-01-01 00:55');
  });

  it('should handle late evening hours', () => {
    // January 1, 2024, 23:45:00 UTC
    const timestamp = 1704152700;
    const result = formatDateTime(timestamp);
    expect(result).toBe('2024-01-01 23:45');
  });
});
