import './Details.css';

import {
  ErrorContainer,
  LoadingContainer,
  NotFoundContainer,
} from '../../../components';

import { useGetBlockDetails } from './api';
import { DetailItem } from './components';
import { formatDateTime } from './utils';

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
    <>
      <p className="block-description">
        Block at depth {data.height} in the Bitcoin blockchain
      </p>

      <dl>
        {/* TODO: create copy icon functionality to copy the hash */}
        <DetailItem label="Hash" value={blockHash} />
        <DetailItem label="Confirmations" value="TODO" />
        <DetailItem label="Timestamp" value={formatDateTime(data.time)} />
        <DetailItem label="Height" value={data.height} />
        <DetailItem label="Miner" value="TODO" />
        <DetailItem label="Number of Transactions" value="TODO" />
        <DetailItem label="Difficulty" value="TODO" />
        <DetailItem label="Merkle root" value="TODO" />
        <DetailItem label="Version" value="TODO" />
        <DetailItem label="Bits" value="TODO" />
        <DetailItem label="Weight" value="TODO" />
        <DetailItem label="Size" value="TODO" />
        <DetailItem label="Nonce" value="TODO" />
        <DetailItem label="Transaction Volume" value="TODO" />
        <DetailItem label="Block Reward" value="TODO" />
        <DetailItem label="Fee Reward" value="TODO" />
      </dl>
    </>
  );
}
