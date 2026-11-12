import Card from './components/ui/Card';
import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerList';
import InvoiceForm from './components/invoices/InvoiceForm';
import InvoiceList from './components/invoices/InvoiceList';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [customers, setCustomers] = useLocalStorage('lipaflow-customers', []);
  const [invoices, setInvoices] = useLocalStorage('lipaflow-invoices', []);

  function addCustomer(customer) {
    setCustomers((prev) => [...prev, customer]);
  }

  function deleteCustomer(id) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  function addInvoice(invoice) {
    setInvoices((prev) => [...prev, invoice]);
  }

  function markInvoicePaid(id) {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv))
    );
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

      <Card title="Create invoice">
        <InvoiceForm customers={customers} onAddInvoice={addInvoice} />
      </Card>

      <Card title={`Invoices (${invoices.length})`}>
        <InvoiceList
          invoices={invoices}
          customers={customers}
          onMarkPaid={markInvoicePaid}
        />
      </Card>
    </div>
  );
}

export default App;