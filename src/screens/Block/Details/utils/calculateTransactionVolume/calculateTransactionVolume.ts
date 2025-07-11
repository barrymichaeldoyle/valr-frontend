import Big from 'big.js';

import { satoshisToBTC } from '../../../../../util';
import type { BlockDetails } from '../../api';

export function calculateTransactionVolume(blockDetails: BlockDetails): string {
  const transactionVolumeExcludingCoinbase = blockDetails.tx
    .slice(1) // skip coinbase transaction
    .reduce(
      (acc, tx) =>
        acc.add(
          tx.out.reduce((acc, output) => acc.add(output.value), new Big(0))
        ),
      new Big(0)
    );

  return `${satoshisToBTC(transactionVolumeExcludingCoinbase.toNumber())} BTC`;
}
