import './LatestBlocks.css';
import { formatHash } from './utils/formatHash';

const mockBlocks = [
  {
    height: 800000,
    hash: '00000000000000000005ca55a40c80213c61e5dfc6a5c2d6d38263303ead1468',
    mined: '2 minutes ago',
    miner: 'MiningPool_Alpha',
    size: '1,259,633 bytes',
  },
  {
    height: 799999,
    hash: '00000000000000000004b8a5a40c80213c61e5dfc6a5c2d6d38263303ead1467',
    mined: '5 minutes ago',
    miner: 'CryptoMiner_Pro',
    size: '1,198,745 bytes',
  },
  {
    height: 799998,
    hash: '00000000000000000003a7b4a40c80213c61e5dfc6a5c2d6d38263303ead1466',
    mined: '8 minutes ago',
    miner: 'BlockForge_2024',
    size: '1,342,891 bytes',
  },
];

export function LatestBlocks() {
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
            {mockBlocks.map((block, index) => (
              <tr key={index} className="block-row">
                <td className="height-cell">
                  <a href={`/btc/${block.height}`} className="block-link">
                    {block.height.toLocaleString()}
                  </a>
                </td>
                <td className="hash-cell">
                  <span className="hash-text" title={block.hash}>
                    {formatHash(block.hash)}
                  </span>
                </td>
                <td className="mined-cell">{block.mined}</td>
                <td className="miner-cell">
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
