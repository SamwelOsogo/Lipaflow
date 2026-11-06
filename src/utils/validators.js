export function validateName(name) {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
}

export function validatePhone(phone) {
  const cleaned = phone.replace(/\s/g, '');
  if (!cleaned) return 'Phone number is required';
  if (!/^(?:\+254|254|0)[17]\d{8}$/.test(cleaned)) {
    return 'Enter a valid Kenyan number, e.g. 0712345678';
  }
  return '';
}

export function validateEmail(email) {
  if (!email.trim()) return '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return 'Enter a valid email address';
  }
  return '';
}