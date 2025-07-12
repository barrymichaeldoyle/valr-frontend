import './DetailItemSpinner.css';

import { LoadingSpinner } from '../../../../../components';

/**
 * A spinner specifically styled for `DetailItem` values
 * @returns A spinner for detail item values
 */
export function DetailItemSpinner() {
  return (
    <div className="detail-item-loading-spinner-container">
      <LoadingSpinner size="small" />
    </div>
  );
}
