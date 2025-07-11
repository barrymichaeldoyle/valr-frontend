/**
 * @param count - The number of items.
 * @param singular - The singular form of the word.
 * @param plural - The plural form of the word.
 * @returns The pluralized word.
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string
): string {
  return Math.abs(count) === 1 ? singular : plural;
}
