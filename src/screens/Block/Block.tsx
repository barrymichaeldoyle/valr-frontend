import './Block.css';

import { useParams } from 'react-router';

import { ErrorContainer } from '../../components';
import { BTC } from '../../icons';

import { Details } from './Details/Details';

export function Block() {
  const { blockHash } = useParams();

  return (
    <>
      <div className="block-header">
        <span className="block-header-icon">
          <BTC />
        </span>
        <h2>
          BTC / <span>Block</span>
        </h2>
      </div>

      {blockHash ? (
        <Details blockHash={blockHash} />
      ) : (
        // This should never happen, but just in case, we catch it here.
        <ErrorContainer title="Block not found" />
      )}
    </>
  );
}
