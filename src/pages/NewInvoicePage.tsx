import { Link, useNavigate } from 'react-router';
import Card from '../components/ui/Card';
import InvoiceForm from '../components/invoices/InvoiceForm';
import type { Customer, NewInvoice } from '../types';
import './pages.css';

interface NewInvoicePageProps {
  customers: Customer[];
  onAddInvoice: (data: NewInvoice) => Promise<void>;
}

function NewInvoicePage({ customers, onAddInvoice }: NewInvoicePageProps) {
  const navigate = useNavigate();

  async function handleAdd(data: NewInvoice) {
    await onAddInvoice(data);
    navigate('/invoices');
  }

  return (
    <>
      <div className="page-header">
        <h2>New invoice</h2>
      </div>
      <Card>
        {customers.length === 0 ? (
          <p>
            Add a customer first, then you can create an invoice.{' '}
            <Link to="/customers">Go to customers</Link>
          </p>
        ) : (
          <InvoiceForm customers={customers} onAddInvoice={handleAdd} />
        )}
      </Card>
    </>
  );
}

export default NewInvoicePage;