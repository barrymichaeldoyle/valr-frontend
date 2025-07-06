import { Navigate, Route, Routes } from 'react-router';

import './Layout.css';

import { Block } from '../screens/Block/Block';
import { Home } from '../screens/Home/Home';

import { AssetGuard } from './Routes/AssetGuard';

export function Layout() {
  return (
    <>
      <header>
        <h1>Barry's VALR Frontend Test</h1>
      </header>
      <main>
        <Routes>
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
            path="/:asset/:blockNumber"
            element={
              <AssetGuard>
                <Block />
              </AssetGuard>
            }
          />
        </Routes>
      </main>
    </>
  );
}
