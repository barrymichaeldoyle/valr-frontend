import Big from 'big.js';

import { UNKNOWN_FALLBACK_TEXT } from '../../../../../constants';
import { satoshisToBTC } from '../../../../../util';
import type { BlockDetails } from '../../api';

/**
 * Calculates the block reward for a given block details.
 * Calculation is first transactions first output value minus the fees
 * @param blockDetails - The block details from the API.
 * @returns The block reward value in BTC.
 */
export function calculateBlockReward(blockDetails: BlockDetails): string {
  const fee = blockDetails.fee;
  const firstTransactionOutput = blockDetails?.tx[0]?.out[0]?.value;

  if (!firstTransactionOutput) {
    return UNKNOWN_FALLBACK_TEXT;
  }

  const outputBig = new Big(firstTransactionOutput);
  const feeBig = new Big(fee);
  const blockReward = outputBig.minus(feeBig);

  return `${satoshisToBTC(blockReward.toNumber())} BTC`;
}
