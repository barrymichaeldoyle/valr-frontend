import './BlockExplorer.css';

import { BCH, BTC, ETH } from '../../../icons';

import { BlockExplorerItem } from './BlockExplorerItem/BlockExplorerItem';

const ASSETS = [
  { code: 'btc', name: 'Bitcoin', icon: <BTC />, price: '$9,273.76' },
  { code: 'eth', name: 'Ethereum', icon: <ETH />, price: '$188.03' },
  { code: 'bch', name: 'Bitcoin Cash', icon: <BCH />, price: '$382.77' },
];

export function BlockExplorer() {
  return (
    <nav aria-label="Block Explorer" className="block-explorer-nav">
      <h2 className="block-explorer-title">Block Explorer</h2>
      <ul className="block-explorer-list">
        {ASSETS.map(({ code, name, icon, price }) => (
          <BlockExplorerItem key={code} name={name} price={price} icon={icon} />
        ))}
      </ul>
    </nav>
  );
}
