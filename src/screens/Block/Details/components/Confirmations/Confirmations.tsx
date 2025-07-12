import { DetailItemSpinner } from '../DetailItemSpinner/DetailItemSpinner';

interface ConfirmationsProps {
  confirmations: string | undefined;
  isLatestBlockHeightLoading: boolean;
  latestBlockHeightError: Error | null;
}

export function Confirmations({
  confirmations,
  isLatestBlockHeightLoading,
  latestBlockHeightError,
}: ConfirmationsProps) {
  if (isLatestBlockHeightLoading) {
    return <DetailItemSpinner />;
  }

  if (latestBlockHeightError) {
    return <span className="secondary-text">Error fetching confirmations</span>;
  }

  if (confirmations === undefined) {
    return <span className="secondary-text">No confirmations data found</span>;
  }

  return confirmations;
}
