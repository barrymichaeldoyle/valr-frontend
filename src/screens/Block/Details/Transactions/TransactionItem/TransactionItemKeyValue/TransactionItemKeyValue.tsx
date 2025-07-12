import './TransactionItemKeyValue.css';

import type { ReactNode } from 'react';

interface TransactionItemKeyValueProps {
  label: string;
  value: string | ReactNode;
}

export function TransactionItemKeyValue({
  label,
  value,
}: TransactionItemKeyValueProps) {
  return (
    <div className="transaction-item-key-value">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
