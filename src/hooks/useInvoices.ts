import { useReducer, useEffect, useState } from 'react';
import * as api from '../services/api';
import { initialInvoicesState, invoicesReducer } from '../reducers/invoicesReducer';
import type { NewInvoice } from '../types';
import { getErrorMessage } from '../utils/errors';

function useInvoices() {
  const [state, dispatch] = useReducer(invoicesReducer, initialInvoicesState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    api
      .getInvoices()
      .then((invoices) => {
        if (!ignore) dispatch({ type: 'load_succeeded', invoices });
      })
      .catch((err: unknown) => {
        if (!ignore) dispatch({ type: 'load_failed', error: getErrorMessage(err) });
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    dispatch({ type: 'load_started' });
    setAttempt((n) => n + 1);
  }

  async function addInvoice(data: NewInvoice): Promise<void> {
    const invoice = await api.createInvoice(data);
    dispatch({ type: 'invoice_added', invoice });
  }

  async function markPaid(id: string): Promise<void> {
    const invoice = await api.setInvoiceStatus(id, 'Paid');
    dispatch({ type: 'invoice_updated', invoice });
  }

  async function cancel(id: string): Promise<void> {
    const invoice = await api.setInvoiceStatus(id, 'Cancelled');
    dispatch({ type: 'invoice_updated', invoice });
  }

  return {
    invoices: state.invoices,
    loading: state.loading,
    error: state.error,
    retry,
    addInvoice,
    markPaid,
    cancel,
  };
}

export default useInvoices;