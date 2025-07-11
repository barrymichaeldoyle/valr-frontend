import { useMiningPoolsData } from '../../../../../api';
import { LoadingSpinner } from '../../../../../components';
import { UNKNOWN_MINER_FALLBACK_TEXT } from '../../../../../constants';
import { useGetLatestBlockItemMiner } from '../../api';

interface MinerCellProps {
  txHash: string;
}

export function MinerCell({ txHash }: MinerCellProps) {
  const { data: poolsData, isLoading: poolsLoading } = useMiningPoolsData();
  const { data: miner, isLoading: minerLoading } = useGetLatestBlockItemMiner(
    txHash,
    poolsData
  );

  if (poolsLoading || minerLoading) {
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
