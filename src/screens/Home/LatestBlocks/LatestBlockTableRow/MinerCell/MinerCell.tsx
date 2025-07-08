import { useGetLastestBlockItemMiner } from '../../../../../api';
import { LoadingSpinner } from '../../../../../components';
import { UNKNOWN_MINER_FALLBACK_TEXT } from '../../../../../constants';

interface MinerCellProps {
  txHash: string;
}

export function MinerCell({ txHash }: MinerCellProps) {
  const { data: miner, isLoading } = useGetLastestBlockItemMiner(txHash);

  if (isLoading) {
    return (
      <span className="miner-text">
        <LoadingSpinner size="small" />
      </span>
    );
  }
  const displayMiner = miner || UNKNOWN_MINER_FALLBACK_TEXT;

  return (
    <span className="miner-text block-link" title={displayMiner}>
      {displayMiner}
    </span>
  );
}
