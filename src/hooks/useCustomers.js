import { useState, useEffect } from 'react';
import * as api from '../services/api';

function useCustomers() {
  const [customers, setCustomers] = useState([]);
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
      .catch((err) => {
        if (!ignore) setError(err.message);
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

  async function addCustomer(data) {
    const created = await api.createCustomer(data);
    setCustomers((prev) => [...prev, created]);
  }

  async function removeCustomer(id) {
    await api.deleteCustomer(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  return { customers, loading, error, retry, addCustomer, removeCustomer };
}

export default useCustomers;