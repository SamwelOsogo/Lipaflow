import { useState } from 'react';
import './InvoiceList.css';
import InvoiceCard from './InvoiceCard';
import { todayISO } from '../../utils/dates';
import { getDisplayStatus } from '../../utils/invoiceStatus';
import type { Customer, DisplayStatus, Invoice } from '../../types';

type Filter = 'All' | DisplayStatus;

const FILTERS: Filter[] = ['All', 'Pending', 'Overdue', 'Paid'];

interface InvoiceListProps {
  invoices: Invoice[];
  customers: Customer[];
onMarkPaid: (id: string) => Promise<void>;}

function InvoiceList({ invoices, customers, onMarkPaid }: InvoiceListProps) {
  const [filter, setFilter] = useState<Filter>('All');

  if (invoices.length === 0) {
    return <p>No invoices yet. Create your first one with the form.</p>;
  }

  const today = todayISO();
  const visible = [...invoices]
    .reverse()
    .filter((inv) => filter === 'All' || getDisplayStatus(inv, today) === filter);

  return (
    <div>
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="filter"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 && <p>No {filter.toLowerCase()} invoices.</p>}

      {visible.map((invoice) => {
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