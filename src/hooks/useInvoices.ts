import { useState, useEffect } from 'react';
import * as api from '../services/api';
import type { Invoice, NewInvoice } from '../types';
import { getErrorMessage } from '../utils/errors';

function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    api
      .getInvoices()
      .then((data) => {
        if (!ignore) setInvoices(data);
      })
      .catch((err: unknown) => {
        if (!ignore) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setError('');
    setLoading(true);
    setAttempt((n) => n + 1);
  }

  async function addInvoice(data: NewInvoice): Promise<void> {
    const created = await api.createInvoice(data);
    setInvoices((prev) => [...prev, created]);
  }

  async function markPaid(id: string): Promise<void> {
    const updated = await api.markInvoicePaid(id);
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? updated : inv)));
  }

  return { invoices, loading, error, retry, addInvoice, markPaid };
}

export default useInvoices;