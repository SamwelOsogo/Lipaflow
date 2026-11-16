const DB_KEY = 'lipaflow-db-customers';
const DELAY_MS = 800;
const FAIL_RATE = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateNetwork() {
  await wait(DELAY_MS);
  if (Math.random() < FAIL_RATE) {
    throw new Error('Network error. Please try again.');
  }
}

function readCustomers() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) ?? [];
  } catch {
    return [];
  }
}

function writeCustomers(list) {
  localStorage.setItem(DB_KEY, JSON.stringify(list));
}

export async function getCustomers() {
  await simulateNetwork();
  return readCustomers();
}

export async function createCustomer(data) {
  await simulateNetwork();
  const customer = { ...data, id: crypto.randomUUID() };
  writeCustomers([...readCustomers(), customer]);
  return customer;
}

export async function deleteCustomer(id) {
  await simulateNetwork();
  writeCustomers(readCustomers().filter((c) => c.id !== id));
}