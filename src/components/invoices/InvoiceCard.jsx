import './InvoiceCard.css';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import { formatKES } from '../../utils/money';
import { formatDate } from '../../utils/dates';
import { getDisplayStatus } from '../../utils/invoiceStatus';

function InvoiceCard({ invoice, customerName, today, onMarkPaid }) {
  const status = getDisplayStatus(invoice, today);

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
          <Button variant="secondary" onClick={() => onMarkPaid(invoice.id)}>
            Mark paid
          </Button>
        )}
      </div>
    </div>
  );
}

export default InvoiceCard;