import './BTCValueWithGlobe.css';

import { Globe } from 'lucide-react';

import { satoshisToBTC } from '../../../../../../../util';

interface BTCValueWithGlobeProps {
  value: number;
  type: 'to' | 'from';
}

export function BTCValueWithGlobe({ value, type }: BTCValueWithGlobeProps) {
  return (
    <span className="transaction-item-btc">
      {satoshisToBTC(value)}&nbsp;BTC&nbsp;
      <span className={`transaction-item-btc-globe ${type}`}>
        <Globe />
      </span>
    </span>
  );
}
