import { pluralize } from '../../../../../../util/pluralize/pluralize';

/**
 * Formats a Unix timestamp into a human-readable relative time string.
 *
 * @param timestamp - Unix timestamp in seconds
 * @returns A human-readable string representing the time difference from now
 *
 * @example
 * formatTimestamp(1751907358) // "Just now" (if called at current time)
 * formatTimestamp(1751903758) // "1 hour" (if timestamp is 1 hour ago)
 * formatTimestamp(1751820958) // "1 day" (if timestamp is 1 day ago)
 * formatTimestamp(1749318958) // "1 month" (if timestamp is 1 month ago)
 * formatTimestamp(1718370958) // "2 years" (if timestamp is 2 years ago)
 */
export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const blockTime = timestamp * 1000;
  const diffInSeconds = Math.floor((now - blockTime) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${pluralize(diffInMinutes, 'minute', 'minutes')}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${pluralize(diffInHours, 'hour', 'hours')}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${pluralize(diffInDays, 'day', 'days')}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${pluralize(diffInMonths, 'month', 'months')}`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${pluralize(diffInYears, 'year', 'years')}`;
}
