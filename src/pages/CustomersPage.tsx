import Card from '../components/ui/Card';
import CustomerForm from '../components/customers/CustomerForm';
import CustomerList from '../components/customers/CustomerList';
import useData from '../hooks/useData';
import { getErrorMessage } from '../utils/errors';
import './pages.css';

function CustomersPage() {
  const { customers, addCustomer, deleteCustomer } = useData();

  async function handleDelete(id: string) {
    try {
      await deleteCustomer(id);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  return (
    <>
      <div className="page-header">
        <h2>Customers</h2>
      </div>
      <Card title="New customer">
        <CustomerForm onAddCustomer={addCustomer} />
      </Card>
      <Card title={`All customers (${customers.length})`}>
        <CustomerList customers={customers} onDelete={handleDelete} />
      </Card>
    </>
  );
}

export default CustomersPage;