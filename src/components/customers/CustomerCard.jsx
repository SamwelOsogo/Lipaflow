import './CustomerCard.css';
import Button from '../ui/Button';

function CustomerCard({ customer, onDelete }) {
  const { id, name, phone, email } = customer;

  return (
    <div className="customer-card">
      <div className="customer-info">
        <h4>{name}</h4>
        <p>{phone}</p>
        {email && <p>{email}</p>}
      </div>
      <Button variant="danger" onClick={() => onDelete(id)}>
        Delete
      </Button>
    </div>
  );
}

export default CustomerCard;