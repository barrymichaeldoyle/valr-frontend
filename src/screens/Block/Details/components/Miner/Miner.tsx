import { useGetMiningPoolsData } from '../../../../../api';
import { LoadingSpinner } from '../../../../../components';
import { type BlockDetails } from '../../api';
import { identifyMinerFromCoinbase } from '../../api/utils/identifyMinerFromCoinbase';

interface MinerProps {
  details: BlockDetails;
}

export function Miner({ details }: MinerProps) {
  const { data: poolsData, isLoading: poolsLoading } = useGetMiningPoolsData();

  if (poolsLoading) {
    return <LoadingSpinner size="small" />;
  }

  if (!poolsData) {
    return <span className="">No Miner Pool Data Found</span>;
  }

  const miner = identifyMinerFromCoinbase(
    poolsData,
    details.tx[0].inputs[0].script
  );

  return (
    <span className="link" title={miner}>
      {miner}
    </span>
  );
}
