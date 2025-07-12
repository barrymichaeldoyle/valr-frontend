import './TransactionItem.css';

import { ArrowBigRight } from 'lucide-react';
import { useMemo } from 'react';

import { formatSize } from '../../../../../util';
import { satoshisToBTC } from '../../../../../util/satoshisToBTC/satoshisToBTC';
import type { Transaction } from '../../api/useGetBlockDetails/useGetBlockDetails';
import { formatDateTime } from '../../utils';

import { BTCValueWithGlobe } from './components/BTCValueWithGlobe/BTCValueWithGlobe';
import { TransactionItemKeyValue } from './components/TransactionItemKeyValue/TransactionItemKeyValue';

const UNKNOWN_FEE_DETAIL = 'N/A';

interface TransactionItemProps {
  confirmations: string | undefined;
  transaction: Transaction;
}

export function TransactionItem({
  confirmations,
  transaction,
}: TransactionItemProps) {
  const isCoinbaseTransaction = useMemo(
    () =>
      transaction.inputs.length === 1 &&
      transaction.inputs[0].prev_out &&
      transaction.inputs[0].prev_out.n === 4294967295 &&
      transaction.inputs[0].prev_out.tx_index === 0,
    [transaction.inputs]
  );

  const feeDetails = useMemo(() => {
    const satPerB = transaction.size
      ? `${(transaction.fee / transaction.size).toFixed(3)} sat/B`
      : UNKNOWN_FEE_DETAIL;
    const satPerWU = transaction.weight
      ? `${(transaction.fee / transaction.weight).toFixed(3)} sat/WU`
      : UNKNOWN_FEE_DETAIL;
    const bytes = transaction.size
      ? formatSize(transaction.size)
      : UNKNOWN_FEE_DETAIL;

    return `(${[satPerB, satPerWU, bytes].join(' - ')})`;
  }, [transaction.fee, transaction.size, transaction.weight]);

  const totalBTC = useMemo(
    () =>
      `${satoshisToBTC(
        transaction.out.reduce((sum, output) => sum + output.value, 0)
      )} BTC`,
    [transaction.out]
  );

  return (
    <div className="transaction-item">
      <TransactionItemKeyValue
        label="Hash"
        value={
          <div className="transaction-item-from-to">
            <div className="transaction-item-from">
              <div className="transaction-item-hash">
                <span className="link">{transaction.hash}</span>
                {isCoinbaseTransaction ? (
                  <span className="coinbase-label">
                    COINBASE (Newly Generated Coins)
                  </span>
                ) : (
                  <div className="transaction-item-inputs">
                    {transaction.inputs.map(input => (
                      <div key={input.index} className="transaction-item-input">
                        {input.prev_out && input.prev_out.addr ? (
                          <>
                            <span className="transaction-item-input-address link">
                              {input.prev_out.addr}
                            </span>
                            <BTCValueWithGlobe
                              type="from"
                              value={input.prev_out.value}
                            />
                          </>
                        ) : (
                          <span className="secondary-text">No inputs data</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="transaction-item-arrow">
              <ArrowBigRight />
            </div>
            <div className="transaction-item-to">
              <span className="transaction-date">
                {formatDateTime(transaction.time)}
              </span>
              <div>
                {transaction.out.map((output, idx) => {
                  const isOpReturn = Boolean(
                    output.script && output.script.startsWith('6a')
                  );
                  return (
                    <div key={idx} className="transaction-item-input">
                      <span
                        className={`transaction-item-input-address${
                          !isOpReturn ? ' link' : ''
                        }`}
                      >
                        {isOpReturn ? 'OP_RETURN' : output.addr}
                      </span>

                      <BTCValueWithGlobe
                        type="to"
                        value={output.value}
                        hideGlobe={isOpReturn}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        }
      />
      <TransactionItemKeyValue
        label="Fee"
        value={
          <div className="transaction-item-fee-row">
            <div className="transaction-item-fee-container">
              <span className="transaction-item-fee">
                {satoshisToBTC(transaction.fee)} BTC
              </span>
              <span className="transaction-item-fee-details">{feeDetails}</span>
            </div>
            <div className="transaction-item-badges">
              <div className="transaction-item-badges-container">
                <span className="transaction-item-total-btc-value-badge">
                  {totalBTC}
                </span>
                <span className="transaction-item-confirmations-badge">
                  {confirmations} Confirmations
                </span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
