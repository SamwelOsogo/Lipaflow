import type { DisplayStatus, Invoice } from '../types';

export function getDisplayStatus(
  invoice: Pick<Invoice, 'status' | 'dueDate'>,
  today: string
): DisplayStatus {
  if (invoice.status === 'Paid') return 'Paid';
  if (invoice.dueDate && invoice.dueDate < today) return 'Overdue';
  return 'Pending';
}