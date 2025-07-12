import './Details.css';

import {
  ErrorContainer,
  LoadingContainer,
  NotFoundContainer,
} from '../../../components';
import { formatNumber, formatSize, satoshisToBTC } from '../../../util';

import { useGetBlockDetails } from './api';
import { DetailItem } from './components';
import { Confirmations } from './components/Confirmations/Confirmations';
import { Miner } from './components/Miner/Miner';
import { Transactions } from './Transactions/Transactions';
import {
  calculateBlockReward,
  calculateDifficultyFromBits,
  calculateTransactionVolume,
  formatDateTime,
} from './utils';

interface DetailsProps {
  blockHash: string;
}

export function Details({ blockHash }: DetailsProps) {
  const { data, error, isLoading } = useGetBlockDetails(blockHash);

  if (isLoading) {
    return <LoadingContainer message="Fetching block details..." />;
  }

  if (error) {
    return <ErrorContainer message="Failed to fetch block details" />;
  }

  if (!data) {
    return <NotFoundContainer message="Couldn't find block details" />;
  }

  return (
    <div className="block-details">
      <p className="block-description">
        Block at depth {data.height} in the Bitcoin blockchain
      </p>

      <dl>
        {/* TODO: create copy icon functionality to copy the hash */}
        <DetailItem label="Hash" value={blockHash} />
        <DetailItem
          label="Confirmations"
          value={<Confirmations blockDetails={data} />}
        />
        <DetailItem label="Timestamp" value={formatDateTime(data.time)} />
        <DetailItem label="Height" value={formatNumber(data.height)} />
        <DetailItem label="Miner" value={<Miner details={data} />} />
        <DetailItem
          label="Number of Transactions"
          value={formatNumber(data.n_tx)}
        />
        <DetailItem
          label="Difficulty"
          value={calculateDifficultyFromBits(data.bits)}
        />
        <DetailItem label="Merkle root" value={data.mrkl_root} />
        <DetailItem label="Version" value={`0x${data.ver.toString(16)}`} />
        <DetailItem label="Bits" value={formatNumber(data.bits)} />
        <DetailItem label="Weight" value={`${formatNumber(data.weight)} WU`} />
        <DetailItem label="Size" value={formatSize(data.size)} />
        <DetailItem label="Nonce" value={formatNumber(data.nonce)} />
        <DetailItem
          label="Transaction Volume"
          value={calculateTransactionVolume(data)}
        />
        <DetailItem label="Block Reward" value={calculateBlockReward(data)} />
        <DetailItem
          label="Fee Reward"
          value={`${satoshisToBTC(data.fee)} BTC`}
        />
      </dl>

      <Transactions transactions={data.tx} />
    </div>
  );
}
