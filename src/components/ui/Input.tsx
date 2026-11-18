import type { ChangeEvent } from 'react';
// @ts-ignore: CSS imports are handled by the bundler.
import './Input.css';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
}: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default Input;