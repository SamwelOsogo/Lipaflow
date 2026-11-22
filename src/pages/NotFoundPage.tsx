import { Link } from 'react-router';
import Card from '../components/ui/Card';

function NotFoundPage() {
  return (
    <Card title="Page not found">
      <p>There is nothing at this address.</p>
      <Link to="/invoices">Go to invoices</Link>
    </Card>
  );
}

export default NotFoundPage;