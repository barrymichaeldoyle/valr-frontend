import './TransactionItem.css';

import { ArrowBigRight } from 'lucide-react';

import type { Transaction } from '../../api/useGetBlockDetails/useGetBlockDetails';

import { TransactionItemKeyValue } from './TransactionItemKeyValue/TransactionItemKeyValue';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="transaction-item">
      <div className="transaction-item-from">
        <TransactionItemKeyValue
          label="Hash"
          value={
            <div className="transaction-item-hash">
              <span className="link">{transaction.hash}</span>
            </div>
          }
        />
        <TransactionItemKeyValue label="Fee" value="TODO" />
      </div>
      <div className="transaction-item-arrow">
        <ArrowBigRight />
      </div>
      <div className="transaction-item-to"></div>
    </div>
  );
}
