import CustomerCard from './CustomerCard';

function CustomerList({ customers, onDelete }) {
  if (customers.length === 0) {
    return <p>No customers yet. Add your first one above.</p>;
  }

  return (
    <div>
      {customers.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default CustomerList;