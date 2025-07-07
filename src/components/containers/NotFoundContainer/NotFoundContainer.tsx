import '../containers.css';
import './NotFoundContainer.css';

import { Search } from 'lucide-react';

interface NotFoundContainerProps {
  message?: string;
  title?: string;
}

export function NotFoundContainer({
  message = 'No results found',
  title = 'Nothing here',
}: NotFoundContainerProps) {
  return (
    <div className="container-base not-found-container">
      <Search className="container-icon not-found-icon" />
      <h3 className="container-title not-found-title">{title}</h3>
      {message && (
        <p className="container-message not-found-message">{message}</p>
      )}
    </div>
  );
}
