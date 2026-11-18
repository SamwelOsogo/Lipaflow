export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export type NewCustomer = Omit<Customer, 'id'>;

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export type InvoiceStatus = 'Pending' | 'Paid';
export type DisplayStatus = InvoiceStatus | 'Overdue';

export interface Invoice {
  id: string;
  customerId: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: InvoiceStatus;
  createdAt: string;
}