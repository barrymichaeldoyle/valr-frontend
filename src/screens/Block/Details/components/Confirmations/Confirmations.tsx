import { formatNumber } from '../../../../../util';
import type { BlockDetails } from '../../api';
import { DetailItemSpinner } from '../DetailItemSpinner/DetailItemSpinner';

import { useGetConfirmations } from './api/useGetConfirmations/useGetConfirmations';

interface ConfirmationsProps {
  blockDetails: BlockDetails;
}

export function Confirmations({ blockDetails }: ConfirmationsProps) {
  const {
    data: confirmations,
    isLoading,
    error,
  } = useGetConfirmations(blockDetails);

  if (isLoading) {
    return <DetailItemSpinner />;
  }

  if (error) {
    return <span className="secondary-text">Error fetching confirmations</span>;
  }

  if (confirmations === undefined) {
    return <span className="secondary-text">No confirmations found</span>;
  }

  return formatNumber(confirmations);
}
