import Card from '../components/ui/Card';
import CustomerForm from '../components/customers/CustomerForm';
import CustomerList from '../components/customers/CustomerList';
import type { Customer, NewCustomer } from '../types';
import './pages.css';

interface CustomersPageProps {
  customers: Customer[];
  onAddCustomer: (data: NewCustomer) => Promise<void>;
  onDelete: (id: string) => void;
}

function CustomersPage({ customers, onAddCustomer, onDelete }: CustomersPageProps) {
  return (
    <>
      <div className="page-header">
        <h2>Customers</h2>
      </div>
      <Card title="New customer">
        <CustomerForm onAddCustomer={onAddCustomer} />
      </Card>
      <Card title={`All customers (${customers.length})`}>
        <CustomerList customers={customers} onDelete={onDelete} />
      </Card>
    </>
  );
}

export default CustomersPage;