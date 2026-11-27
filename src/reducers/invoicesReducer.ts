import type { Invoice } from '../types';

export interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
  error: string;
}

export type InvoicesAction =
  | { type: 'load_started' }
  | { type: 'load_succeeded'; invoices: Invoice[] }
  | { type: 'load_failed'; error: string }
  | { type: 'invoice_added'; invoice: Invoice }
  | { type: 'invoice_updated'; invoice: Invoice };

export const initialInvoicesState: InvoicesState = {
  invoices: [],
  loading: true,
  error: '',
};

export function invoicesReducer(
  state: InvoicesState,
  action: InvoicesAction
): InvoicesState {
  switch (action.type) {
    case 'load_started':
      return { ...state, loading: true, error: '' };
    case 'load_succeeded':
      return { invoices: action.invoices, loading: false, error: '' };
    case 'load_failed':
      return { ...state, loading: false, error: action.error };
    case 'invoice_added':
      return { ...state, invoices: [...state.invoices, action.invoice] };
    case 'invoice_updated':
      return {
        ...state,
        invoices: state.invoices.map((inv) =>
          inv.id === action.invoice.id ? action.invoice : inv
        ),
      };
  }
}