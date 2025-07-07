import '../containers.css';
import './ErrorContainer.css';

import { AlertCircle } from 'lucide-react';

interface ErrorContainerProps {
  message?: string;
  title?: string;
}

export function ErrorContainer({
  message = 'Something went wrong',
  title = 'Oops!',
}: ErrorContainerProps) {
  return (
    <div className="container-base error-container">
      <AlertCircle className="container-icon error-icon" />
      <h3 className="container-title error-title">{title}</h3>
      {message && <p className="container-message error-message">{message}</p>}
    </div>
  );
}
