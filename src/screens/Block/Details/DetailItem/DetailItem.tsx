import './DetailItem.css';

import type { ReactNode } from 'react';

interface DetailItemProps {
  label: string;
  value: string | ReactNode;
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="detail-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
