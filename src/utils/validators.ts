export function validateName(name: string): string {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
}

export function validatePhone(phone: string): string {
  const cleaned = phone.replace(/\s/g, '');
  if (!cleaned) return 'Phone number is required';
  if (!/^(?:\+254|254|0)[17]\d{8}$/.test(cleaned)) {
    return 'Enter a valid Kenyan number, e.g. 0712345678';
  }
  return '';
}

export function validateEmail(email: string): string {
  if (!email.trim()) return '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return 'Enter a valid email address';
  }
return '';

}



export function validateKraPin(kraPin?: string): string {
  if (!kraPin || !kraPin.trim()) return '';
  const cleaned = kraPin.trim().toUpperCase();
  if (!/^[AP]\d{9}[A-Z]$/.test(cleaned)) {
    return 'Enter a valid KRA PIN (e.g. A123456789Z)';
  }
  return '';
}

