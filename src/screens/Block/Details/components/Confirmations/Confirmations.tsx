interface ConfirmationsProps {
  blockHash: string;
}

export function Confirmations({ blockHash }: ConfirmationsProps) {
  console.log(blockHash);

  return 'TODO: Fetch Latest Block';
}
