import { useState } from 'react';
import CustomerCard from './CustomerCard';
import Input from '../ui/Input';

function CustomerList({ customers, onDelete }) {
  const [search, setSearch] = useState('');

  if (customers.length === 0) {
    return <p>No customers yet. Add your first one above.</p>;
  }

  const term = search.trim().toLowerCase();
  const visible = customers.filter(
    (c) => c.name.toLowerCase().includes(term) || c.phone.includes(term)
  );

  return (
    <div>
      <Input
        label="Search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Name or phone"
      />
      {visible.length === 0 && <p>No customers match your search.</p>}
      {visible.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default CustomerList;