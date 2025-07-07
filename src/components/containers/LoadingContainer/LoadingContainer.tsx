import '../containers.css';
import './LoadingContainer.css';

import { LoadingSpinner } from '../../LoadingSpinner/LoadingSpinner';

interface LoadingContainerProps {
  message?: string;
}

export function LoadingContainer({
  message = 'Loading...',
}: LoadingContainerProps) {
  return (
    <div className="container-base loading-container">
      <LoadingSpinner size="large" className="container-icon" />
      {message && (
        <p className="container-message loading-message">{message}</p>
      )}
    </div>
  );
}
