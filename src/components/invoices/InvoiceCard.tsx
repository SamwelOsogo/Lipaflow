import { useState } from 'react';
import './InvoiceCard.css';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import { formatKES } from '../../utils/money';
import { formatDate } from '../../utils/dates';
import { getDisplayStatus } from '../../utils/invoiceStatus';
import { getErrorMessage } from '../../utils/errors';
import type { Invoice } from '../../types';
import { Link } from 'react-router';
import { canTransition } from '../../utils/invoiceTransitions';    


interface InvoiceCardProps {
  invoice: Invoice;
  customerName: string;
  today: string;
  onMarkPaid: (id: string) => Promise<void>;
  onCancelInvoice: (id: string) => Promise<void>;
}

function InvoiceCard({ invoice, customerName, today, onMarkPaid, onCancelInvoice }: InvoiceCardProps) {
  const [paying, setPaying] = useState(false);
  const status = getDisplayStatus(invoice, today);

  async function handleMarkPaid() {
    setPaying(true);
    try {
      await onMarkPaid(invoice.id);
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="invoice-card">
      <div className="invoice-info">
        <h4>
  <Link to={`/invoices/${invoice.id}`}>{customerName}</Link>
</h4>
        <p>
          {invoice.items.length} item(s) · {formatKES(invoice.total)}
        </p>
        {invoice.dueDate && <p>Due {formatDate(invoice.dueDate)}</p>}
      </div>
      <div className="invoice-side">
        <StatusBadge status={status} />
        {canTransition(invoice.status, 'Cancelled ') && (
          <Button variant="secondary" onClick={handleMarkPaid} disabled={paying}>
            {paying ? 'Saving...' : 'Mark paid'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default InvoiceCard;