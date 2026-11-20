import type { Invoice } from '../types';
import { getDisplayStatus } from './invoiceStatus';

export interface Owed {
  waiting: number;
  overdue: number;
}

export function summarizeOwed(invoices: readonly Invoice[], today: string): Owed {
  let waitingCents = 0;
  let overdueCents = 0;

  for (const invoice of invoices) {
    const status = getDisplayStatus(invoice, today);
    const cents = Math.round(invoice.total * 100);
    if (status === 'Pending') waitingCents += cents;
    if (status === 'Overdue') overdueCents += cents;
  }

  return { waiting: waitingCents / 100, overdue: overdueCents / 100 };
}