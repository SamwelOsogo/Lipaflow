import { useState } from 'react';
import { Link, useParams } from 'react-router';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusBadge from '../components/invoices/StatusBadge';
import { formatKES } from '../utils/money';
import { formatDate, todayISO } from '../utils/dates';
import { getDisplayStatus } from '../utils/invoiceStatus';
import { getErrorMessage } from '../utils/errors';
import type { Customer, Invoice } from '../types';
import './pages.css';

interface InvoiceDetailPageProps {
  invoices: Invoice[];
  customers: Customer[];
  onMarkPaid: (id: string) => Promise<void>;
}

function InvoiceDetailPage({ invoices, customers, onMarkPaid }: InvoiceDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [paying, setPaying] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <Card title="Invoice not found">
        <p>This invoice doesn't exist or was removed.</p>
        <Link to="/invoices">Back to invoices</Link>
      </Card>
    );
  }

  const invoiceId = invoice.id;
  const customer = customers.find((c) => c.id === invoice.customerId);
  const status = getDisplayStatus(invoice, todayISO());

  async function handleMarkPaid() {
    setPaying(true);
    try {
      await onMarkPaid(invoiceId);
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setPaying(false);
    }
  }

  return (
    <>
      <Link to="/invoices" className="back-link">
        Back to invoices
      </Link>

      <Card title={customer ? customer.name : 'Deleted customer'}>
        <div className="sheet-meta">
          <StatusBadge status={status} />
          <p className="muted">Due {formatDate(invoice.dueDate)}</p>
        </div>

        {invoice.items.map((item, index) => (
          <div className="sheet-row" key={index}>
            <span>
              {item.description}{' '}
              <span className="muted">
                {item.quantity} × {formatKES(item.price)}
              </span>
            </span>
            <span>{formatKES(item.quantity * item.price)}</span>
          </div>
        ))}

        <div className="sheet-totals">
          <p>
            <span>Subtotal</span>
            <span>{formatKES(invoice.subtotal)}</span>
          </p>
          <p>
            <span>VAT (16%)</span>
            <span>{formatKES(invoice.vat)}</span>
          </p>
          <p className="grand-total">
            <span>Total</span>
            <span>{formatKES(invoice.total)}</span>
          </p>
        </div>

        {status !== 'Paid' && (
          <Button onClick={handleMarkPaid} disabled={paying}>
            {paying ? 'Saving...' : 'Mark as paid'}
          </Button>
        )}
      </Card>
    </>
  );
}

export default InvoiceDetailPage;