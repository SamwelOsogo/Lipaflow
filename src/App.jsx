
import Card from './components/ui/Card';
import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerList';
import useLocalStorage from './hooks/useLocalStorage';
function App() {
const [customers, setCustomers] = useLocalStorage('lipaflow-customers', []);
  function addCustomer(customer) {
    setCustomers((prev) => [...prev, customer]);
  }

  function deleteCustomer(id) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>LipaFlow</h1>
      <Card title="Add customer">
        <CustomerForm onAddCustomer={addCustomer} />
      </Card>
      <Card title={`Customers (${customers.length})`}>
        <CustomerList customers={customers} onDelete={deleteCustomer} />
      </Card>
    </div>
  );
}

export default App;