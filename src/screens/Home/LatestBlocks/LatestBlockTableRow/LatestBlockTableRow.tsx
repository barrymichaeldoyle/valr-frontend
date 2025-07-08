import './LatestBlockTableRow.css';

import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';

import type { GetBlockSummaryResponseItem } from '../api';

import { MinerCell } from './MinerCell/MinerCell';
import { formatHash, formatTimestamp, pluralize } from './utils';

interface LatestBlockTableRowProps {
  block: GetBlockSummaryResponseItem;
  index: number;
}

export function LatestBlockTableRow({
  block,
  index,
}: LatestBlockTableRowProps) {
  const navigate = useNavigate();

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
        <MinerCell txHash={block.tx[0]} />
      </td>
      <td className="size-cell">{formatSize(block.size)}</td>
    </tr>
  );
}
