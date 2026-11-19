import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateName, validatePhone, validateEmail } from '../../utils/validators';
import { getErrorMessage } from '../../utils/errors';
import type { NewCustomer } from '../../types';

type FormErrors = Partial<Record<keyof NewCustomer, string>>;

const emptyForm: NewCustomer = { name: '', phone: '', email: '' };

interface CustomerFormProps {
  onAddCustomer: (data: NewCustomer) => Promise<void>;
}

function CustomerForm({ onAddCustomer }: CustomerFormProps) {
  const [values, setValues] = useState<NewCustomer>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
    if (hasErrors) return;

    setSaving(true);
    setSubmitError('');
    try {
      await onAddCustomer({ ...values, name: values.name.trim() });
      setValues(emptyForm);
      setErrors({});
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
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
      {submitError && <p className="error-text">{submitError}</p>}
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Add customer'}
      </Button>
    </form>
  );
}

export default CustomerForm;