import { useMemo } from 'react';

import { useGetMiningPoolsData } from '../../../../../api';
import { type BlockDetails } from '../../api';
import { identifyMinerFromCoinbase } from '../../api/utils/identifyMinerFromCoinbase';
import { DetailItemSpinner } from '../DetailItemSpinner/DetailItemSpinner';

interface MinerProps {
  details: BlockDetails;
}

export function Miner({ details }: MinerProps) {
  const {
    data: poolsData,
    isLoading: poolsLoading,
    error: poolsError,
  } = useGetMiningPoolsData();
  const coinbaseScript = details.tx[0].inputs[0].script;

  const miner = useMemo(
    () => identifyMinerFromCoinbase(poolsData, coinbaseScript),
    [poolsData, coinbaseScript]
  );

  if (poolsLoading) {
    return <DetailItemSpinner />;
  }

  if (poolsError) {
    return (
      <span className="secondary-text">Error fetching miner pool data</span>
    );
  }

  if (!poolsData) {
    return <span className="secondary-text">No miner pool data found</span>;
  }

  return (
    <span className="link" title={miner}>
      {miner}
    </span>
  );
}
