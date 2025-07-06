import './LatestBlocks.css';

import { useNavigate } from 'react-router';

import { mockBlocks } from './data';
import { formatHash } from './utils/formatHash';

export function LatestBlocks() {
  const navigate = useNavigate();

  function handleRowClick(height: number) {
    navigate(`/btc/${height}`);
  }

  function handleKeyDown(event: React.KeyboardEvent, height: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRowClick(height);
    }
  }

  return (
    <div className="latest-blocks">
      <h2>Latest Blocks</h2>
      <div className="table-container">
        <table className="blocks-table">
          <thead>
            <tr>
              <th>Height</th>
              <th>Hash</th>
              <th>Mined</th>
              <th>Miner</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: Create a component for the block row after data hookup */}
            {mockBlocks.map((block, index) => (
              <tr
                key={index}
                className="block-row"
                onClick={() => handleRowClick(block.height)}
                onKeyDown={e => handleKeyDown(e, block.height)}
                tabIndex={0}
                role="button"
                aria-label={`View details for block ${block.height.toLocaleString()}`}
              >
                <td className="height-cell block-link">
                  {block.height.toLocaleString()}
                </td>
                <td className="hash-cell block-link">
                  <span className="hash-text" title={block.hash}>
                    {formatHash(block.hash)}
                  </span>
                </td>
                <td className="mined-cell">{block.mined}</td>
                <td className="miner-cell block-link">
                  <span className="miner-text" title={block.miner}>
                    {block.miner}
                  </span>
                </td>
                <td className="size-cell">{block.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
