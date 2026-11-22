import { Navigate, Route, Routes } from 'react-router';
import AppShell from './components/layout/AppShell';
import DataGate from './components/layout/DataGate';
import InvoicesPage from './pages/InvoicesPage';
import NewInvoicePage from './pages/NewInvoicePage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import CustomersPage from './pages/CustomersPage';
import NotFoundPage from './pages/NotFoundPage';
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
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/invoices" replace />} />

        <Route element={<DataGate loading={loading} error={loadError} onRetry={retryAll} />}>
          <Route
            path="invoices"
            element={
              <InvoicesPage invoices={invoices} customers={customers} onMarkPaid={markPaid} />
            }
          />
          <Route
            path="invoices/new"
            element={<NewInvoicePage customers={customers} onAddInvoice={addInvoice} />}
          />
          <Route
            path="invoices/:id"
            element={
              <InvoiceDetailPage
                invoices={invoices}
                customers={customers}
                onMarkPaid={markPaid}
              />
            }
          />
          <Route
            path="customers"
            element={
              <CustomersPage
                customers={customers}
                onAddCustomer={addCustomer}
                onDelete={deleteCustomer}
              />
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;