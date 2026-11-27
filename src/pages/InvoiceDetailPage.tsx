import { useState } from 'react';
import { Link, useParams } from 'react-router';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusBadge from '../components/invoices/StatusBadge';
import useData from '../hooks/useData';
import { formatKES } from '../utils/money';
import { formatDate, todayISO } from '../utils/dates';
import { getDisplayStatus } from '../utils/invoiceStatus';
import { canTransition } from '../utils/invoiceTransitions';
import { getErrorMessage } from '../utils/errors';
import './pages.css';

function InvoiceDetailPage() {
  const { invoices, customers, markInvoicePaid, cancelInvoice } = useData();
  const { id } = useParams<{ id: string }>();
  const [busy, setBusy] = useState(false);

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
  const canPay = canTransition(invoice.status, 'Paid');
  const canCancel = canTransition(invoice.status, 'Cancelled');

  async function run(action: (id: string) => Promise<void>) {
    setBusy(true);
    try {
      await action(invoiceId);
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function handleCancel() {
    if (window.confirm('Cancel this invoice? This cannot be undone.')) {
      void run(cancelInvoice);
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

        {(canPay || canCancel) && (
          <div className="sheet-actions">
            {canPay && (
              <Button onClick={() => run(markInvoicePaid)} disabled={busy}>
                {busy ? 'Saving...' : 'Mark as paid'}
              </Button>
            )}
            {canCancel && (
              <Button variant="secondary" onClick={handleCancel} disabled={busy}>
                Cancel invoice
              </Button>
            )}
          </div>
        )}
      </Card>
    </>
  );
}

export default InvoiceDetailPage;