import './Copy.css';

import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface CopyProps {
  value: string;
}

export function Copy({ value }: CopyProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    if (isCopied) {
      return;
    }

    if (typeof value === 'string') {
      navigator.clipboard.writeText(value);
    }
    setIsCopied(true);

    // Clear any existing timeout before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const Icon = isCopied ? ClipboardCheck : Clipboard;

  return (
    <span>
      <Icon
        className={`copy-icon${isCopied ? ' disabled' : ''}`}
        onClick={handleCopy}
        aria-label={isCopied ? 'Hash copied!' : 'Copy hash'}
      />
      {isCopied && (
        <span className="copy-icon-tooltip">Copied to clipboard!</span>
      )}
    </span>
  );
}
