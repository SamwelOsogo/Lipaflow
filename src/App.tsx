import './App.css';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerList';
import InvoiceForm from './components/invoices/InvoiceForm';
import InvoiceList from './components/invoices/InvoiceList';
import useLocalStorage from './hooks/useLocalStorage';
import useCustomers from './hooks/useCustomers';
import { getErrorMessage } from './utils/errors';
import { todayISO } from './utils/dates';
import { formatKES } from './utils/money';
import { summarizeOwed } from './utils/owed';
import type { Invoice } from './types';

function App() {
  const { customers, loading, error, retry, addCustomer, removeCustomer } = useCustomers();
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('lipaflow-invoices', []);

  const owed = summarizeOwed(invoices, todayISO());

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

  function addInvoice(invoice: Invoice) {
    setInvoices((prev) => [...prev, invoice]);
  }

  function markInvoicePaid(id: string) {
    setInvoices((prev) =>
      prev.map((inv): Invoice => (inv.id === id ? { ...inv, status: 'Paid' } : inv))
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>LipaFlow</h1>
        <p className="owed">
          <span>Waiting {formatKES(owed.waiting)}</span>
          <span className={owed.overdue > 0 ? 'owed-overdue' : undefined}>
            Overdue {formatKES(owed.overdue)}
          </span>
        </p>
      </header>

      <main className="layout">
        <div className="column">
          <Card title={`Invoices (${invoices.length})`}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <InvoiceList
                invoices={invoices}
                customers={customers}
                onMarkPaid={markInvoicePaid}
              />
            )}
          </Card>

          <Card title={`Customers (${customers.length})`}>
            {loading && <p>Loading customers...</p>}
            {error && (
              <div>
                <p className="error-text">{error}</p>
                <Button onClick={retry}>Try again</Button>
              </div>
            )}
            {!loading && !error && (
              <CustomerList customers={customers} onDelete={deleteCustomer} />
            )}
          </Card>
        </div>

        <div className="column">
          <Card title="New invoice">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <InvoiceForm customers={customers} onAddInvoice={addInvoice} />
            )}
          </Card>

          <Card title="New customer">
            <CustomerForm onAddCustomer={addCustomer} />
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;