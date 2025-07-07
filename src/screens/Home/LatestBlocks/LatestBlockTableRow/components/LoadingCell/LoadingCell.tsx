import { LoadingSpinner } from '../../../../../../components';

import type { ReactNode } from 'react';

interface LoadingCellProps<T> {
  isLoading: boolean;
  error: unknown;
  data: T | null | undefined;
  renderData: (data: T) => ReactNode;
  fallbackText?: string;
  className?: string;
}

export function LoadingCell<T>({
  isLoading,
  error,
  data,
  renderData,
  fallbackText = 'Unknown',
  className = '',
}: LoadingCellProps<T>) {
  if (isLoading) {
    return <LoadingSpinner size="small" />;
  }

  if (error || !data) {
    return <span className={className}>{fallbackText}</span>;
  }

  return <>{renderData(data)}</>;
}
