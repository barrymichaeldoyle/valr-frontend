import type { PropsWithChildren } from 'react';
import { Navigate, useParams } from 'react-router';

import { ASSETS, type Asset } from '../../types';

/**
 * This component is used to guard the routes to only allow the allowed assets.
 * If the asset is not allowed, it will redirect to the BTC page.
 */
export function AssetGuard({ children }: PropsWithChildren) {
  const { asset } = useParams();
  if (!ASSETS.includes(asset as Asset)) {
    return <Navigate to="/btc" replace />;
  }
  return children;
}
