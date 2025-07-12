import type { Transaction } from '../api/useGetBlockDetails/useGetBlockDetails';

import { TransactionItem } from './TransactionItem/TransactionItem';

interface TransactionsProps {
  transactions: Transaction[];
}

export function Transactions({ transactions }: TransactionsProps) {
  console.log(transactions[0]);

  return (
    <div>
      <h3>Transactions</h3>

      <div className="transactions-list">
        {transactions.map(transaction => (
          <TransactionItem key={transaction.hash} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
