import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '../ui/Button';
import { calculateTotals, formatKES } from '../../utils/money';
import { daysFromTodayISO } from '../../utils/dates';
import { getErrorMessage } from '../../utils/errors';
import type { Customer, NewInvoice } from '../../types';
import './InvoiceForm.css';

interface ItemDraft {
  id: string;
  description: string;
  quantity: string;
  price: string;
}

interface InvoiceFormErrors {
  customer?: string;
  dueDate?: string;
  items?: string;
}

function createItem(): ItemDraft {
  return { id: crypto.randomUUID(), description: '', quantity: '1', price: '' };
}

interface InvoiceFormProps {
  customers: Customer[];
  onAddInvoice: (data: NewInvoice) => Promise<void>;
}

function InvoiceForm({ customers, onAddInvoice }: InvoiceFormProps) {
  const [customerId, setCustomerId] = useState('');
  const [dueDate, setDueDate] = useState(() => daysFromTodayISO(14));
  const [items, setItems] = useState<ItemDraft[]>([createItem()]);
  const [errors, setErrors] = useState<InvoiceFormErrors>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totals = calculateTotals(items);

  function updateItem(
    id: string,
    field: 'description' | 'quantity' | 'price',
    value: string
  ) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, createItem()]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function validate(): InvoiceFormErrors {
    const newErrors: InvoiceFormErrors = {};
    if (!customerId) newErrors.customer = 'Choose a customer';
    if (!dueDate) newErrors.dueDate = 'Choose a due date';

    const itemsValid = items.every(
      (item) =>
        item.description.trim() && Number(item.quantity) > 0 && Number(item.price) > 0
    );
    if (!itemsValid) {
      newErrors.items =
        'Every item needs a description, a quantity above 0 and a price above 0';
    }
    return newErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    setSubmitError('');
    try {
      await onAddInvoice({
        customerId,
        dueDate,
        items: items.map(({ description, quantity, price }) => ({
          description: description.trim(),
          quantity: Number(quantity),
          price: Number(price),
        })),
      });
      setCustomerId('');
      setDueDate(daysFromTodayISO(14));
      setItems([createItem()]);
      setErrors({});
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  if (customers.length === 0) {
    return <p>Add a customer first, then you can create an invoice.</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="invoice-field">
        <label htmlFor="customer">Customer</label>
        <select
          id="customer"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="">Select a customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.customer && <span className="error-text">{errors.customer}</span>}
      </div>

      <div className="invoice-field">
        <label htmlFor="dueDate">Due date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
      </div>

      <h4>Items</h4>
      {items.map((item) => (
        <div className="item-row" key={item.id}>
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={item.price}
            onChange={(e) => updateItem(item.id, 'price', e.target.value)}
          />
          <Button
            variant="danger"
            onClick={() => removeItem(item.id)}
            disabled={items.length === 1}
          >
            ✕
          </Button>
        </div>
      ))}
      {errors.items && <span className="error-text">{errors.items}</span>}

      <div className="invoice-actions">
        <Button variant="secondary" onClick={addItem}>
          + Add item
        </Button>
      </div>

      <div className="totals">
        <p>Subtotal: {formatKES(totals.subtotal)}</p>
        <p>VAT (16%): {formatKES(totals.vat)}</p>
        <p className="grand-total">Total: {formatKES(totals.total)}</p>
      </div>

      {submitError && <p className="error-text">{submitError}</p>}
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Create invoice'}
      </Button>
    </form>
  );
}

export default InvoiceForm;