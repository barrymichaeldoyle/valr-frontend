import Big from 'big.js';

import { formatNumber } from '../../../../../util';

/**
 * Calculates the difficulty from the bits.
 * @param bits - The bits of the block.
 * @returns The difficulty of the block.
 */
export function calculateDifficultyFromBits(bits: number): string {
  // Extract exponent (first byte) and mantissa (last 3 bytes)
  const exponent = bits >>> 24;
  const mantissa = bits & 0x00ffffff;

  // Handle edge cases where target would be zero
  if (mantissa === 0) {
    return '∞'; // Infinite difficulty when target is zero
  }

  // Calculate target from bits using Big.js for precision
  let target: Big;
  if (exponent <= 3) {
    target = new Big(mantissa).div(new Big(2).pow(8 * (3 - exponent)));
  } else {
    target = new Big(mantissa).mul(new Big(2).pow(8 * (exponent - 3)));
  }

  // Check if target is zero (shouldn't happen with mantissa check, but safety)
  if (target.eq(0)) {
    return '∞';
  }

  // Max target (difficulty 1) - using Big.js for precision
  const maxTarget = new Big(0xffff).mul(new Big(2).pow(208));

  // Calculate difficulty with Big.js for arbitrary precision
  const difficulty = maxTarget.div(target);

  // Round to 2 decimal places and format
  const roundedDifficulty = difficulty.round(2);

  // Convert to number for formatting (safe since we're rounding to 2 decimal places)
  return formatNumber(Number(roundedDifficulty));
}
