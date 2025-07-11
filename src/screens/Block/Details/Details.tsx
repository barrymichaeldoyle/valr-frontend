import './Details.css';

import { useParams } from 'react-router';

import { DetailItem } from './DetailItem/DetailItem';

export function Details() {
  const { blockHash } = useParams();

  return (
    <>
      <p className="block-description">
        Block at depth {blockHash} in the Bitcoin blockchain
      </p>

      <dl>
        <DetailItem label="Hash" value="TODO" />
        <DetailItem label="Confirmations" value="TODO" />
        <DetailItem label="Timestamp" value="TODO" />
        <DetailItem label="Height" value="TODO" />
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
