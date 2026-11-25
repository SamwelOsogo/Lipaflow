import { Outlet } from 'react-router';
import Button from '../ui/Button';
import useData from '../../hooks/useData';

function DataGate() {
  const { loading, error, retry } = useData();

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <p className="error-text">{error}</p>
        <Button onClick={retry}>Try again</Button>
      </div>
    );
  }

  return <Outlet />;
}

export default DataGate;