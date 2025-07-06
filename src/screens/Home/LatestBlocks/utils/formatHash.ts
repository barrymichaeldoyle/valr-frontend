export function formatHash(hash: string) {
  let startIndex = 0;
  for (let i = 0; i < hash.length; i++) {
    if (hash[i] !== '0') {
      startIndex = i;
      break;
    }
  }

  if (startIndex === 0 && hash[0] === '0') {
    return '0..';
  }

  return `0..${hash.substring(startIndex)}`;
}
