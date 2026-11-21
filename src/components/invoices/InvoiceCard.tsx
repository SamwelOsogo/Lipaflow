import { useState } from 'react';
import './InvoiceCard.css';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import { formatKES } from '../../utils/money';
import { formatDate } from '../../utils/dates';
import { getDisplayStatus } from '../../utils/invoiceStatus';
import { getErrorMessage } from '../../utils/errors';
import type { Invoice } from '../../types';

interface InvoiceCardProps {
  invoice: Invoice;
  customerName: string;
  today: string;
  onMarkPaid: (id: string) => Promise<void>;
}

function InvoiceCard({ invoice, customerName, today, onMarkPaid }: InvoiceCardProps) {
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
        <h4>{customerName}</h4>
        <p>
          {invoice.items.length} item(s) · {formatKES(invoice.total)}
        </p>
        {invoice.dueDate && <p>Due {formatDate(invoice.dueDate)}</p>}
      </div>
      <div className="invoice-side">
        <StatusBadge status={status} />
        {status !== 'Paid' && (
          <Button variant="secondary" onClick={handleMarkPaid} disabled={paying}>
            {paying ? 'Saving...' : 'Mark paid'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default InvoiceCard;