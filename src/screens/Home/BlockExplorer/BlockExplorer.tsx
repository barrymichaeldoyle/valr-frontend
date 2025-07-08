import './BlockExplorer.css';

import type { ReactNode } from 'react';

import { BCH, BTC, ETH } from '../../../icons';

import type { AssetSymbol } from './BlockExplorerItem/api/useGetCurrentAssetPrice';
import { BlockExplorerItem } from './BlockExplorerItem/BlockExplorerItem';

const ASSETS: { name: string; icon: ReactNode; symbol: AssetSymbol }[] = [
  {
    name: 'Bitcoin',
    icon: <BTC />,
    symbol: 'BTC-USD',
  },
  {
    name: 'Ethereum',
    icon: <ETH />,
    symbol: 'ETH-USD',
  },
  {
    name: 'Bitcoin Cash',
    icon: <BCH />,
    symbol: 'BCH-USD',
  },
];

export function BlockExplorer() {
  return (
    <nav aria-label="Block Explorer" className="block-explorer-nav">
      <h2 className="block-explorer-title">Block Explorer</h2>
      <ul className="block-explorer-list">
        {ASSETS.map(({ name, icon, symbol }) => (
          <BlockExplorerItem
            key={symbol}
            name={name}
            symbol={symbol}
            icon={icon}
          />
        ))}
      </ul>
    </nav>
  );
}
