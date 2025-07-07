/**
 * @param count - The number of items.
 * @param singular - The singular form of the word.
 * @param plural - The plural form of the word.
 * @returns The pluralized word.
 *
 * Note: this should be moved to a top level utils file if used in other places.
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string
): string {
  return count === 1 ? singular : plural;
}
