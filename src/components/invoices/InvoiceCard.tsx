import './InvoiceCard.css';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import { formatKES } from '../../utils/money';
import { formatDate } from '../../utils/dates';
import { getDisplayStatus } from '../../utils/invoiceStatus';
import type { Invoice } from '../../types';

interface InvoiceCardProps {
  invoice: Invoice;
  customerName: string;
  today: string;
  onMarkPaid: (id: string) => void;
}

function InvoiceCard({ invoice, customerName, today, onMarkPaid }: InvoiceCardProps) {
  const status = getDisplayStatus(invoice, today);

  return (
    <div className="invoice-row">
      <div className="invoice-main">
        <h4>{customerName}</h4>
        {invoice.dueDate && <p className="muted">Due {formatDate(invoice.dueDate)}</p>}
      </div>
      <p className="amount">{formatKES(invoice.total)}</p>
      <div className="invoice-status">
        <StatusBadge status={status} />
        {status !== 'Paid' && (
          <Button variant="quiet" onClick={() => onMarkPaid(invoice.id)}>
            Mark as paid
          </Button>
        )}
      </div>
    </div>
  );
}

export default InvoiceCard;