import './LatestBlockTableRow.css';

import { useNavigate } from 'react-router';

import { useGetBlockDetails } from '../../../../api';

import { LoadingCell } from './components';
import { formatHash, formatTimestamp, pluralize } from './utils';

import type { KeyboardEvent } from 'react';

interface Block {
  height: number;
  hash: string;
  time: number;
}

interface LatestBlockTableRowProps {
  block: Block;
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

  function handleRowClick(height: number) {
    navigate(`/btc/${height}`);
  }

  function handleKeyDown(event: KeyboardEvent, height: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRowClick(height);
    }
  }

  function formatSize(bytes: number): string {
    return `${bytes.toLocaleString()} ${pluralize(bytes, 'byte', 'bytes')}`;
  }

  return (
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
      <td className="mined-cell">{formatTimestamp(block.time)}</td>
      <td
        className={`miner-cell ${blockDetails?.relayed_by ? 'block-link' : ''}`}
      >
        <LoadingCell
          isLoading={isLoading}
          error={error}
          data={blockDetails?.relayed_by}
          renderData={relayedBy => (
            <span className="miner-text" title={relayedBy}>
              {relayedBy}
            </span>
          )}
          fallbackText="Unknown"
          className="miner-text"
        />
      </td>
      <td className="size-cell">
        <LoadingCell
          isLoading={isLoading}
          error={error}
          data={blockDetails?.size}
          renderData={size => formatSize(size)}
          fallbackText="Unknown"
        />
      </td>
    </tr>
  );
}
