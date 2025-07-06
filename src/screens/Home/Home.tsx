import { BlockExplorer } from './BlockExplorer/BlockExplorer';
import { Search } from './Search/Search';
import './Home.css';

export function Home() {
  return (
    <div className="home-container">
      <BlockExplorer />
      <div className="home-content">
        <Search />
        <div>
          <h2>Latest Blocks</h2>
          <div>
            <div>
              <span>Block</span>
              <span>Age</span>
              <span>etc.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
