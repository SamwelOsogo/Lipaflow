import InvoiceCard from './InvoiceCard';
import { todayISO } from '../../utils/dates';

function InvoiceList({ invoices, customers, onMarkPaid }) {
  if (invoices.length === 0) {
    return <p>No invoices yet. Create your first one above.</p>;
  }

  const today = todayISO();

  return (
    <div>
      {[...invoices].reverse().map((invoice) => {
        const customer = customers.find((c) => c.id === invoice.customerId);
        return (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            customerName={customer ? customer.name : 'Deleted customer'}
            today={today}
            onMarkPaid={onMarkPaid}
          />
        );
      })}
    </div>
  );
}

export default InvoiceList;