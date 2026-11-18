import type { ReactNode } from 'react';
// @ts-ignore — the CSS module is handled by the Vite bundler
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;