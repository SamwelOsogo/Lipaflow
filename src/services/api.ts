import type { Customer, Invoice, NewCustomer, NewInvoice } from '../types';
import { calculateTotals } from '../utils/money';

const CUSTOMERS_KEY = 'lipaflow-db-customers';
const INVOICES_KEY = 'lipaflow-db-invoices';
const DELAY_MS = 800;
const FAIL_RATE = 0;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateNetwork(): Promise<void> {
  await wait(DELAY_MS);
  if (Math.random() < FAIL_RATE) {
    throw new Error('Network error. Please try again.');
  }
}

function readList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, list: T[]): void {
  localStorage.setItem(key, JSON.stringify(list));
}

export async function getCustomers(): Promise<Customer[]> {
  await simulateNetwork();
  return readList<Customer>(CUSTOMERS_KEY);
}

export async function createCustomer(data: NewCustomer): Promise<Customer> {
  await simulateNetwork();
  const customer: Customer = { ...data, id: crypto.randomUUID() };
  writeList(CUSTOMERS_KEY, [...readList<Customer>(CUSTOMERS_KEY), customer]);
  return customer;
}

export async function deleteCustomer(id: string): Promise<void> {
  await simulateNetwork();
  writeList(
    CUSTOMERS_KEY,
    readList<Customer>(CUSTOMERS_KEY).filter((c) => c.id !== id)
  );
}

export async function getInvoices(): Promise<Invoice[]> {
  await simulateNetwork();
  return readList<Invoice>(INVOICES_KEY);
}

export async function createInvoice(data: NewInvoice): Promise<Invoice> {
  await simulateNetwork();
  const invoice: Invoice = {
    ...data,
    ...calculateTotals(data.items),
    id: crypto.randomUUID(),
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  writeList(INVOICES_KEY, [...readList<Invoice>(INVOICES_KEY), invoice]);
  return invoice;
}

export async function markInvoicePaid(id: string): Promise<Invoice> {
  await simulateNetwork();
  const invoices = readList<Invoice>(INVOICES_KEY);
  const existing = invoices.find((inv) => inv.id === id);
  if (!existing) {
    throw new Error('Invoice not found.');
  }
  const updated: Invoice = { ...existing, status: 'Paid' };
  writeList(
    INVOICES_KEY,
    invoices.map((inv) => (inv.id === id ? updated : inv))
  );
  return updated;
}