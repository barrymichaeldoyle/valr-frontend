import type { Transaction } from '../api/useGetBlockDetails/useGetBlockDetails';

import { TransactionItem } from './TransactionItem/TransactionItem';

interface TransactionsProps {
  confirmations: string | undefined;
  transactions: Transaction[];
}

export function Transactions({
  confirmations,
  transactions,
}: TransactionsProps) {
  return (
    <div>
      <h3>Transactions</h3>

      <div className="transactions-list">
        {transactions.map(transaction => (
          <TransactionItem
            key={transaction.hash}
            confirmations={confirmations}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}
