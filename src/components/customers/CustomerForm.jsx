import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateName, validatePhone, validateEmail } from '../../utils/validators';

const emptyForm = { name: '', phone: '', email: '' };

function CustomerForm({ onAddCustomer }) {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
    if (hasErrors) return;

    onAddCustomer({ ...values, name: values.name.trim(), id: Date.now() });
    setValues(emptyForm);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Full name"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="e.g. Wanjiku Kamau"
        error={errors.name}
      />
      <Input
        label="Phone number"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        placeholder="e.g. 0712345678"
        error={errors.phone}
      />
      <Input
        label="Email (optional)"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="e.g. wanjiku@example.com"
        error={errors.email}
      />
      <Button type="submit">Add customer</Button>
    </form>
  );
}

export default CustomerForm;