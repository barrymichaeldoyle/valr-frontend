import './Home.css';

import { BlockExplorer } from './BlockExplorer/BlockExplorer';
import { LatestBlocks } from './LatestBlocks/LatestBlocks';
import { Search } from './Search/Search';

export function Home() {
  return (
    <div className="home-container">
      <BlockExplorer />
      <div className="home-content">
        <Search />
        <LatestBlocks />
      </div>
    </div>
  );
}
