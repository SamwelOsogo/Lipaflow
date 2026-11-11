import { useState } from 'react';
import Button from '../ui/Button';
import { calculateTotals, formatKES } from '../../utils/money';
import './InvoiceForm.css';

function createItem() {
  return { id: crypto.randomUUID(), description: '', quantity: '1', price: '' };
}

function InvoiceForm({ customers, onAddInvoice }) {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState([createItem()]);
  const [errors, setErrors] = useState({});

  const totals = calculateTotals(items);

  function updateItem(id, field, value) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, createItem()]);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function validate() {
    const newErrors = {};
    if (!customerId) newErrors.customer = 'Choose a customer';

    const itemsValid = items.every(
      (item) =>
        item.description.trim() && Number(item.quantity) > 0 && Number(item.price) > 0
    );
    if (!itemsValid) {
      newErrors.items = 'Every item needs a description, a quantity above 0 and a price above 0';
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onAddInvoice({
      id: crypto.randomUUID,
      customerId: Number(customerId),
      items: items.map(({ description, quantity, price }) => ({
        description: description.trim(),
        quantity: Number(quantity),
        price: Number(price),
      })),
      ...totals,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });

    setCustomerId('');
    setItems([createItem()]);
    setErrors({});
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

      <Button type="submit">Create invoice</Button>
    </form>
  );
}

export default InvoiceForm;