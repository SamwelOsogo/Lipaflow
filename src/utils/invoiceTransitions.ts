import type { InvoiceStatus } from '../types';

const ALLOWED: Record<InvoiceStatus, readonly InvoiceStatus[]> = {
  Pending: ['Paid', 'Cancelled'],
  Paid: [],
  Cancelled: [],
};

export function canTransition(from: InvoiceStatus, to: InvoiceStatus): boolean {
  return ALLOWED[from].includes(to);
}