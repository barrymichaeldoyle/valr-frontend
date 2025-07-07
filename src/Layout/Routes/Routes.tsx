import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router';

import { Block } from '../../screens/Block/Block';
import { Home } from '../../screens/Home/Home';

import { AssetGuard } from './AssetGuard';

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Navigate to="/btc" replace />} />
      <Route
        path="/:asset"
        element={
          <AssetGuard>
            <Home />
          </AssetGuard>
        }
      />
      <Route
        path="/:asset/:blockHash"
        element={
          <AssetGuard>
            <Block />
          </AssetGuard>
        }
      />
    </ReactRouterRoutes>
  );
}
