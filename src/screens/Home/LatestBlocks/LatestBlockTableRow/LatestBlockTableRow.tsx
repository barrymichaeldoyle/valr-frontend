import './LatestBlockTableRow.css';

import { useNavigate } from 'react-router';

import { useGetBlockDetails } from '../../../../api';

import { LoadingCell } from './components';
import { formatHash, formatTimestamp, pluralize } from './utils';

import type { GetBlockSummaryResponseItem } from '../../../../api';
import type { KeyboardEvent } from 'react';

interface LatestBlockTableRowProps {
  block: GetBlockSummaryResponseItem;
  index: number;
}

export function LatestBlockTableRow({
  block,
  index,
}: LatestBlockTableRowProps) {
  const navigate = useNavigate();

  const {
    data: blockDetails,
    isLoading,
    error,
  } = useGetBlockDetails(block.hash);

  function handleRowClick() {
    navigate(`/${block.height}`);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick();
    }
  }

  function formatSize(bytes: number): string {
    return `${bytes.toLocaleString()} ${pluralize(bytes, 'byte', 'bytes')}`;
  }

  return (
    <tr
      key={index}
      className="block-row"
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Block ${block.height}. Click to view details.`}
    >
      <td className="height-cell block-link">
        {block.height.toLocaleString()}
      </td>
      <td className="hash-cell block-link">
        <span className="hash-text" title={block.hash}>
          {formatHash(block.hash)}
        </span>
      </td>
      <td className="mined-cell">{formatTimestamp(block.time)}</td>
      <td className="miner-cell">
        <LoadingCell
          isLoading={isLoading}
          error={error}
          data={blockDetails?.miner}
          renderData={miner => (
            <span
              className={`miner-text${miner === 'Unknown' ? '' : ' block-link'}`}
              title={miner}
            >
              {miner}
            </span>
          )}
          fallbackText="Unknown"
        />
      </td>
      <td className="size-cell">{formatSize(block.size)}</td>
    </tr>
  );
}
