import { Link, useParams } from 'react-router';

import { BCH, BTC, ETH } from '../../../icons';
import './BlockExplorer.css'; // Create this for your styles

const ASSETS = [
  { code: 'btc', name: 'Bitcoin', icon: <BTC />, price: '$9,273.76' },
  { code: 'eth', name: 'Ethereum', icon: <ETH />, price: '$188.03' },
  { code: 'bch', name: 'Bitcoin Cash', icon: <BCH />, price: '$382.77' },
];

export function BlockExplorer() {
  const { asset } = useParams();

  return (
    <nav aria-label="Block Explorer" className="block-explorer-nav">
      <h2 className="block-explorer-title">Block Explorer</h2>
      <ul className="block-explorer-list">
        {ASSETS.map(({ code, name, icon, price }) => (
          <li key={code} className="block-explorer-item">
            <Link
              to={`/${code}`}
              className={`block-explorer-link${asset === code ? ' active' : ''}`}
              aria-current={asset === code ? 'page' : undefined}
            >
              <span className="block-explorer-icon">{icon}</span>
              <span className="block-explorer-text">
                <span className="block-explorer-label">{name}</span>
                <span className="block-explorer-price">{price}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
