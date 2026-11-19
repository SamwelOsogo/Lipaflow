import type { Customer, NewCustomer } from '../types';

const DB_KEY = 'lipaflow-db-customers';
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

function readCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? (JSON.parse(raw) as Customer[]) : [];
  } catch {
    return [];
  }
}

function writeCustomers(list: Customer[]): void {
  localStorage.setItem(DB_KEY, JSON.stringify(list));
}

export async function getCustomers(): Promise<Customer[]> {
  await simulateNetwork();
  return readCustomers();
}

export async function createCustomer(data: NewCustomer): Promise<Customer> {
  await simulateNetwork();
  const customer: Customer = { ...data, id: crypto.randomUUID() };
  writeCustomers([...readCustomers(), customer]);
  return customer;
}

export async function deleteCustomer(id: string): Promise<void> {
  await simulateNetwork();
  writeCustomers(readCustomers().filter((c) => c.id !== id));
}