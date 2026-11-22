import { Outlet } from 'react-router';
import Button from '../ui/Button';

interface DataGateProps {
  loading: boolean;
  error: string;
  onRetry: () => void;
}

function DataGate({ loading, error, onRetry }: DataGateProps) {
  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <p className="error-text">{error}</p>
        <Button onClick={onRetry}>Try again</Button>
      </div>
    );
  }

  return <Outlet />;
}

export default DataGate;