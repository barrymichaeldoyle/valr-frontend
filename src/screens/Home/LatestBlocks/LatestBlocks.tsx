import './LatestBlocks.css';

import { useGetLatestBlocksSummary } from '../../../api';
import {
  ErrorContainer,
  LoadingContainer,
  NotFoundContainer,
} from '../../../components';

import { LatestBlockTableRow } from './LatestBlockTableRow/LatestBlockTableRow';

export function LatestBlocks() {
  const { data, isLoading, error } = useGetLatestBlocksSummary();

  if (isLoading) {
    return <LoadingContainer message="Fetching latest blocks..." />;
  }

  if (error) {
    return <ErrorContainer message="Failed to fetch latest blocks" />;
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <NotFoundContainer message="Couldn't find latest blocks" />;
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
            {data.map((block, index) => (
              <LatestBlockTableRow key={index} block={block} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
