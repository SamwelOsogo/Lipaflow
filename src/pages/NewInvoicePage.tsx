import { Link, useNavigate } from 'react-router';
import Card from '../components/ui/Card';
import InvoiceForm from '../components/invoices/InvoiceForm';
import useData from '../hooks/useData';
import type { NewInvoice } from '../types';
import './pages.css';

function NewInvoicePage() {
  const { customers, addInvoice } = useData();
  const navigate = useNavigate();

  async function handleAdd(data: NewInvoice) {
    await addInvoice(data);
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