import './StatusBadge.css';
import type { DisplayStatus } from '../../types';

interface StatusBadgeProps {
  status: DisplayStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>;
}

export default StatusBadge;