import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function LoadingSpinner({
  size = 'medium',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`} />
  );
}
