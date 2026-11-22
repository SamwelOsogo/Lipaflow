import { Link } from 'react-router';
import Card from '../components/ui/Card';
import InvoiceList from '../components/invoices/InvoiceList';
import type { Customer, Invoice } from '../types';
import './pages.css';

interface InvoicesPageProps {
  invoices: Invoice[];
  customers: Customer[];
  onMarkPaid: (id: string) => Promise<void>;
}

function InvoicesPage({ invoices, customers, onMarkPaid }: InvoicesPageProps) {
  return (
    <>
      <div className="page-header">
        <h2>Invoices</h2>
        <Link to="/invoices/new" className="btn btn-primary">
          New invoice
        </Link>
      </div>
      <Card>
        <InvoiceList invoices={invoices} customers={customers} onMarkPaid={onMarkPaid} />
      </Card>
    </>
  );
}

export default InvoicesPage;