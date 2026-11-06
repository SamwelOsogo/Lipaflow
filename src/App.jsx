import { useState } from 'react';
import Card from './components/ui/Card';
import CustomerForm from './components/customers/CustomerForm';

function App() {
  const [customers, setCustomers] = useState([]);

  function addCustomer(customer) {
    setCustomers((prev) => [...prev, customer]);
    console.log('New customer:', customer);
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>LipaFlow</h1>
      <Card title="Add customer">
        <CustomerForm onAddCustomer={addCustomer} />
      </Card>
      <p>Customers saved: {customers.length}</p>
    </div>
  );
}

export default App;