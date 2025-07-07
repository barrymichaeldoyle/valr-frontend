import { Route, Routes } from 'react-router';

import './Layout.css';

import { Block } from '../screens/Block/Block';
import { Home } from '../screens/Home/Home';

export function Layout() {
  return (
    <>
      <header>
        <h1>Barry's VALR Frontend Test</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:blockHash" element={<Block />} />
        </Routes>
      </main>
    </>
  );
}
