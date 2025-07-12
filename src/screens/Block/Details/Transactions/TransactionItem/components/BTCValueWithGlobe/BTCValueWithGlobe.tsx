import './BTCValueWithGlobe.css';

import { Globe } from 'lucide-react';

import { satoshisToBTC } from '../../../../../../../util';

interface BTCValueWithGlobeProps {
  value: number;
  type: 'to' | 'from';
  hideGlobe?: boolean;
}

export function BTCValueWithGlobe({
  value,
  type,
  hideGlobe,
}: BTCValueWithGlobeProps) {
  return (
    <span className="transaction-item-btc">
      {satoshisToBTC(value)}&nbsp;BTC&nbsp;
      {!hideGlobe && (
        <span className={`transaction-item-btc-globe ${type}`}>
          <Globe />
        </span>
      )}
    </span>
  );
}
