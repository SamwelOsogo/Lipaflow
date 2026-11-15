export function getDisplayStatus(invoice, today) {
  if (invoice.status === 'Paid') return 'Paid';
  if (invoice.dueDate && invoice.dueDate < today) return 'Overdue';
  return 'Pending';
}