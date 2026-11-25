import { Navigate, Route, Routes } from 'react-router';
import AppShell from './components/layout/AppShell';
import DataGate from './components/layout/DataGate';
import InvoicesPage from './pages/InvoicesPage';
import NewInvoicePage from './pages/NewInvoicePage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import CustomersPage from './pages/CustomersPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/invoices" replace />} />

        <Route element={<DataGate />}>
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="invoices/new" element={<NewInvoicePage />} />
          <Route path="invoices/:id" element={<InvoiceDetailPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;