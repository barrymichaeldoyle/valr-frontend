import { useMemo } from 'react';
import './BlockExplorerItem.css';

import { useGetCurrentAssetPrice, type AssetSymbol } from './api';

interface BlockExplorerItemProps {
  name: string;
  symbol: AssetSymbol;
  icon: React.ReactNode;
}

export function BlockExplorerItem({
  name,
  symbol,
  icon,
}: BlockExplorerItemProps) {
  const { data: price, isLoading, error } = useGetCurrentAssetPrice(symbol);

  const priceDisplay = useMemo(() => {
    if (isLoading) {
      return 'Loading...';
    }
    if (error) {
      return 'Error';
    }
    if (!price) {
      return 'No data';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }, [isLoading, error, price]);

  return (
    <li className="block-explorer-item">
      <div className="block-explorer-card">
        <span className="block-explorer-icon">{icon}</span>
        <span className="block-explorer-text">
          <span className="block-explorer-label">{name}</span>
          <span className="block-explorer-price">{priceDisplay}</span>
        </span>
      </div>
    </li>
  );
}
