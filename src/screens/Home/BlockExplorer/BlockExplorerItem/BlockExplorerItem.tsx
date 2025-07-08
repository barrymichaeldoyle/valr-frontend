import './BlockExplorerItem.css';

interface BlockExplorerItemProps {
  name: string;
  price: string;
  icon: React.ReactNode;
}

export function BlockExplorerItem({
  name,
  price,
  icon,
}: BlockExplorerItemProps) {
  return (
    <li className="block-explorer-item">
      <div className="block-explorer-card">
        <span className="block-explorer-icon">{icon}</span>
        <span className="block-explorer-text">
          <span className="block-explorer-label">{name}</span>
          <span className="block-explorer-price">{price}</span>
        </span>
      </div>
    </li>
  );
}
