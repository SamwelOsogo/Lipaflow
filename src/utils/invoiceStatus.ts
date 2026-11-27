import type { DisplayStatus, Invoice } from '../types';

export function getDisplayStatus(
  invoice: Pick<Invoice, 'status' | 'dueDate'>,
  today: string
): DisplayStatus {
  if (invoice.status !== 'Pending') return invoice.status;
  if (invoice.dueDate && invoice.dueDate < today) return 'Overdue';
  return 'Pending';
}