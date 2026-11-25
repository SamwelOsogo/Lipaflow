import { Link } from 'react-router';
import Card from '../components/ui/Card';
import InvoiceList from '../components/invoices/InvoiceList';
import useData from '../hooks/useData';
import { formatKES } from '../utils/money';
import { todayISO } from '../utils/dates';
import { summarizeOwed } from '../utils/owed';
import './pages.css';

function InvoicesPage() {
  const { invoices, customers, markInvoicePaid } = useData();
  const owed = summarizeOwed(invoices, todayISO());

  return (
    <>
      <div className="page-header">
        <h2>Invoices</h2>
        <Link to="/invoices/new" className="btn btn-primary">
          New invoice
        </Link>
      </div>

      <p className="owed">
        <span>Waiting {formatKES(owed.waiting)}</span>
        <span className={owed.overdue > 0 ? 'owed-overdue' : undefined}>
          Overdue {formatKES(owed.overdue)}
        </span>
      </p>

      <Card>
        <InvoiceList
          invoices={invoices}
          customers={customers}
          onMarkPaid={markInvoicePaid}
        />
      </Card>
    </>
  );
}

export default InvoicesPage;