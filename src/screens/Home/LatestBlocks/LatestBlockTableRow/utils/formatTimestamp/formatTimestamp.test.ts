import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { formatTimestamp } from './formatTimestamp';

describe('formatTimestamp', () => {
  // Mock current time to ensure consistent test results
  const mockCurrentTime = 1751907358000; // 2025-01-06 12:00:00 UTC

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockCurrentTime);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('recent timestamps (< 1 minute)', () => {
    it('should return "Just now" for timestamps less than 1 minute ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 30; // 30 seconds ago
      expect(formatTimestamp(timestamp)).toBe('Just now');
    });

    it('should return "Just now" for timestamps 59 seconds ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 59;
      expect(formatTimestamp(timestamp)).toBe('Just now');
    });
  });

  describe('minutes', () => {
    it('should return "1 minute" for exactly 1 minute ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 60;
      expect(formatTimestamp(timestamp)).toBe('1 minute');
    });

    it('should return "2 minutes" for 2 minutes ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 120;
      expect(formatTimestamp(timestamp)).toBe('2 minutes');
    });

    it('should return "59 minutes" for 59 minutes ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 3540; // 59 * 60
      expect(formatTimestamp(timestamp)).toBe('59 minutes');
    });
  });

  describe('hours', () => {
    it('should return "1 hour" for exactly 1 hour ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 3600; // 1 hour
      expect(formatTimestamp(timestamp)).toBe('1 hour');
    });

    it('should return "2 hours" for 2 hours ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 7200; // 2 hours
      expect(formatTimestamp(timestamp)).toBe('2 hours');
    });

    it('should return "23 hours" for 23 hours ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 82800; // 23 * 3600
      expect(formatTimestamp(timestamp)).toBe('23 hours');
    });
  });

  describe('days', () => {
    it('should return "1 day" for exactly 1 day ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 86400; // 1 day
      expect(formatTimestamp(timestamp)).toBe('1 day');
    });

    it('should return "2 days" for 2 days ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 172800; // 2 days
      expect(formatTimestamp(timestamp)).toBe('2 days');
    });

    it('should return "29 days" for 29 days ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 2505600; // 29 * 86400
      expect(formatTimestamp(timestamp)).toBe('29 days');
    });
  });

  describe('months', () => {
    it('should return "1 month" for approximately 1 month ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 2592000; // 30 days
      expect(formatTimestamp(timestamp)).toBe('1 month');
    });

    it('should return "2 months" for approximately 2 months ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 5184000; // 60 days
      expect(formatTimestamp(timestamp)).toBe('2 months');
    });

    it('should return "11 months" for approximately 11 months ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 28512000; // 330 days
      expect(formatTimestamp(timestamp)).toBe('11 months');
    });
  });

  describe('years', () => {
    it('should return "1 year" for approximately 1 year ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 31536000; // 365 days
      expect(formatTimestamp(timestamp)).toBe('1 year');
    });

    it('should return "2 years" for approximately 2 years ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 63072000; // 730 days
      expect(formatTimestamp(timestamp)).toBe('2 years');
    });

    it('should return "5 years" for approximately 5 years ago', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 157680000; // 1825 days
      expect(formatTimestamp(timestamp)).toBe('5 years');
    });
  });

  describe('edge cases', () => {
    it('should handle current timestamp', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000);
      expect(formatTimestamp(timestamp)).toBe('Just now');
    });

    it('should handle future timestamps', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) + 3600; // 1 hour in future
      expect(formatTimestamp(timestamp)).toBe('Just now');
    });

    it('should handle very old timestamps', () => {
      const timestamp = Math.floor(mockCurrentTime / 1000) - 315360000; // 10 years
      expect(formatTimestamp(timestamp)).toBe('10 years');
    });

    it('should handle zero timestamp', () => {
      expect(formatTimestamp(0)).toBe('56 years'); // Unix epoch is very old
    });
  });

  describe('boundary conditions', () => {
    it('should transition from "Just now" to "1 minute" at exactly 60 seconds', () => {
      const justNowTimestamp = Math.floor(mockCurrentTime / 1000) - 59;
      const oneMinuteTimestamp = Math.floor(mockCurrentTime / 1000) - 60;

      expect(formatTimestamp(justNowTimestamp)).toBe('Just now');
      expect(formatTimestamp(oneMinuteTimestamp)).toBe('1 minute');
    });

    it('should transition from "59 minutes" to "1 hour" at exactly 3600 seconds', () => {
      const fiftyNineMinutesTimestamp =
        Math.floor(mockCurrentTime / 1000) - 3540; // 59 minutes
      const oneHourTimestamp = Math.floor(mockCurrentTime / 1000) - 3600; // 1 hour

      expect(formatTimestamp(fiftyNineMinutesTimestamp)).toBe('59 minutes');
      expect(formatTimestamp(oneHourTimestamp)).toBe('1 hour');
    });

    it('should transition from "23 hours" to "1 day" at exactly 86400 seconds', () => {
      const twentyThreeHoursTimestamp =
        Math.floor(mockCurrentTime / 1000) - 82800; // 23 hours
      const oneDayTimestamp = Math.floor(mockCurrentTime / 1000) - 86400; // 1 day

      expect(formatTimestamp(twentyThreeHoursTimestamp)).toBe('23 hours');
      expect(formatTimestamp(oneDayTimestamp)).toBe('1 day');
    });
  });
});
