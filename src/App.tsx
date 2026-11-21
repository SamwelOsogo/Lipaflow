import Card from './components/ui/Card';
import Button from './components/ui/Button';
import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerList';
import InvoiceForm from './components/invoices/InvoiceForm';
import InvoiceList from './components/invoices/InvoiceList';
import useCustomers from './hooks/useCustomers';
import useInvoices from './hooks/useInvoices';
import { getErrorMessage } from './utils/errors';

function App() {
  const {
    customers,
    loading: customersLoading,
    error: customersError,
    retry: retryCustomers,
    addCustomer,
    removeCustomer,
  } = useCustomers();

  const {
    invoices,
    loading: invoicesLoading,
    error: invoicesError,
    retry: retryInvoices,
    addInvoice,
    markPaid,
  } = useInvoices();

  const loading = customersLoading || invoicesLoading;
  const loadError = customersError || invoicesError;

  function retryAll() {
    if (customersError) retryCustomers();
    if (invoicesError) retryInvoices();
  }

  async function deleteCustomer(id: string) {
    const hasInvoices = invoices.some((inv) => inv.customerId === id);
    if (hasInvoices) {
      alert('This customer has invoices, so they cannot be deleted.');
      return;
    }
    try {
      await removeCustomer(id);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>LipaFlow</h1>

      <Card title="Add customer">
        <CustomerForm onAddCustomer={addCustomer} />
      </Card>

      <Card title={`Customers (${customers.length})`}>
        {loading && <p>Loading customers...</p>}
        {loadError && (
          <div>
            <p className="error-text">{loadError}</p>
            <Button onClick={retryAll}>Try again</Button>
          </div>
        )}
        {!loading && !loadError && (
          <CustomerList customers={customers} onDelete={deleteCustomer} />
        )}
      </Card>

      <Card title="Create invoice">
        {loading && <p>Loading...</p>}
        {!loading && !loadError && (
          <InvoiceForm customers={customers} onAddInvoice={addInvoice} />
        )}
      </Card>

      <Card title={`Invoices (${invoices.length})`}>
        {loading && <p>Loading...</p>}
        {!loading && !loadError && (
          <InvoiceList
            invoices={invoices}
            customers={customers}
            onMarkPaid={markPaid}
          />
        )}
      </Card>
    </div>
  );
}

export default App;