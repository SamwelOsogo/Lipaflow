export const VAT_RATE = 0.16;

function round2(n) {
  return Math.round(n * 100) / 100;
}

export function formatKES(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(amount);
}

export function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return sum + quantity * price;
  }, 0);

  const vat = round2(subtotal * VAT_RATE);
  return { subtotal: round2(subtotal), vat, total: round2(subtotal + vat) };
}