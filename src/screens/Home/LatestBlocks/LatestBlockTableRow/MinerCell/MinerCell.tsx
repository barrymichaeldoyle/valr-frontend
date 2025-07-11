import { useGetMiningPoolsData } from '../../../../../api';
import { LoadingSpinner } from '../../../../../components';
import { UNKNOWN_FALLBACK_TEXT } from '../../../../../constants';
import { useGetLatestBlockItemMiner } from '../../api';

interface MinerCellProps {
  txHash: string;
}

export function MinerCell({ txHash }: MinerCellProps) {
  const { data: poolsData, isLoading: poolsLoading } = useGetMiningPoolsData();
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
  const displayMiner = miner || UNKNOWN_FALLBACK_TEXT;

  return (
    <span className="miner-text link" title={displayMiner}>
      {displayMiner}
    </span>
  );
}
