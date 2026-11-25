import type { ReactNode } from 'react';
import { DataContext } from './DataContext';
import type { DataContextValue } from './DataContext';
import useCustomers from '../hooks/useCustomers';
import useInvoices from '../hooks/useInvoices';

interface DataProviderProps {
  children: ReactNode;
}

function DataProvider({ children }: DataProviderProps) {
  const customersState = useCustomers();
  const invoicesState = useInvoices();

  async function deleteCustomer(id: string): Promise<void> {
    const hasInvoices = invoicesState.invoices.some((inv) => inv.customerId === id);
    if (hasInvoices) {
      throw new Error('This customer has invoices, so they cannot be deleted.');
    }
    await customersState.removeCustomer(id);
  }

  const value: DataContextValue = {
    customers: customersState.customers,
    invoices: invoicesState.invoices,
    loading: customersState.loading || invoicesState.loading,
    error: customersState.error || invoicesState.error,
    retry() {
      if (customersState.error) customersState.retry();
      if (invoicesState.error) invoicesState.retry();
    },
    addCustomer: customersState.addCustomer,
    deleteCustomer,
    addInvoice: invoicesState.addInvoice,
    markInvoicePaid: invoicesState.markPaid,
  };

  return <DataContext value={value}>{children}</DataContext>;
}

export default DataProvider;