/**
 * Formats a timestamp in seconds to a human-readable date and time string.
 * @param timestamp The timestamp in seconds.
 * @returns The formatted date and time string in the format of "yyyy-MM-dd hh:mm".
 */
export function formatDateTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
