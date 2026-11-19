import { useState, useEffect } from 'react';
import * as api from '../services/api';
import type { Customer, NewCustomer } from '../types';
import { getErrorMessage } from '../utils/errors';

function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    api
      .getCustomers()
      .then((data) => {
        if (!ignore) setCustomers(data);
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

  async function addCustomer(data: NewCustomer): Promise<void> {
    const created = await api.createCustomer(data);
    setCustomers((prev) => [...prev, created]);
  }

  async function removeCustomer(id: string): Promise<void> {
    await api.deleteCustomer(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  return { customers, loading, error, retry, addCustomer, removeCustomer };
}

export default useCustomers;