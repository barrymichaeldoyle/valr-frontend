import './Block.css';

import { BTC } from '../../icons';

import { Details } from './Details/Details';

export function Block() {
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

      <Details />
    </>
  );
}
