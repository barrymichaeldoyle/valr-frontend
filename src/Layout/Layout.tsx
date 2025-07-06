import { Route, Routes } from 'react-router';

import './Layout.css';
import { Home } from '../screens/Home/Home';
import { Block } from '../screens/Block/Block';

export function Layout() {
  return (
    <>
      <header>
        <h1>Barry's VALR Frontend Test</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blocks/:asset/:blockNumber" element={<Block />} />
        </Routes>
      </main>
    </>
  );
}
