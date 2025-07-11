import { formatNumber } from '../formatNumber/formatNumber';
import { pluralize } from '../pluralize/pluralize';

/**
 * Formats a size in bytes to a human-readable string.
 * @param bytes - The size in bytes.
 * @returns The formatted size.
 */
export function formatSize(bytes: number): string {
  return `${formatNumber(bytes)} ${pluralize(bytes, 'byte', 'bytes')}`;
}
