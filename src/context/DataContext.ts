import { createContext } from 'react';
import type { Customer, Invoice, NewCustomer, NewInvoice } from '../types';

export interface DataContextValue {
  customers: Customer[];
  invoices: Invoice[];
  loading: boolean;
  error: string;
  retry: () => void;
  addCustomer: (data: NewCustomer) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  addInvoice: (data: NewInvoice) => Promise<void>;
  markInvoicePaid: (id: string) => Promise<void>;
    cancelInvoice: (id: string) => Promise<void>;
}

export const DataContext = createContext<DataContextValue | null>(null);