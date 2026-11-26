import { test, expect } from '@playwright/test';

const API = 'https://petstore.swagger.io/v2';
const uniqueId = () => Date.now() * 1000 + Math.floor(Math.random() * 1000);

test('an unknown pet returns 404', async ({ request }) => {
  const res = await request.get(`${API}/pet/987654321012`);
  expect(res.status()).toBe(404);
  const body = await res.json();
  expect(body.message).toBe('Pet not found');
});

test.describe('a pet of my own', () => {
  let petId: number;

  test.beforeEach(async ({ request }) => {
    petId = uniqueId();
    const res = await request.post(`${API}/pet`, {
      data: { id: petId, name: 'Lab11-alexmn', photoUrls: [], status: 'available' },
    });
    expect(res).toBeOK();
  });

  test.afterEach(async ({ request }) => {
    await request.delete(`${API}/pet/${petId}`);
  });

  test('can be read back with the same data', async ({ request }) => {
    const res = await request.get(`${API}/pet/${petId}`);
    expect(res.status()).toBe(200);
    const pet = await res.json();
    expect(pet.name).toBe('Lab11-alexmn');
    expect(pet.status).toBe('available');
  });

  test('is gone after delete', async ({ request }) => {
    const del = await request.delete(`${API}/pet/${petId}`);
    expect(del.status()).toBe(200);
    const res = await request.get(`${API}/pet/${petId}`);
    expect(res.status()).toBe(404);
  });
});

test.describe('an order of my own', () => {
  let orderId: number;

  test.beforeEach(() => {
    orderId = uniqueId();
  });

  test.afterEach(async ({ request }) => {
    await request.delete(`${API}/store/order/${orderId}`);
  });

  test('order round trip: create, read back, delete', async ({ request }) => {
    const create = await request.post(`${API}/store/order`, {
      data: { id: orderId, petId: 1, quantity: 2, status: 'placed', complete: false },
    });
    expect(create.status()).toBe(200);

    const get = await request.get(`${API}/store/order/${orderId}`);
    expect(get.status()).toBe(200);
    const order = await get.json();
    expect(order.quantity).toBe(2);
    expect(order.status).toBe('placed');

    const del = await request.delete(`${API}/store/order/${orderId}`);
    expect(del.status()).toBe(200);
  });

  test('deleting an order twice: the second delete answers 404', async ({ request }) => {
    await request.post(`${API}/store/order`, {
      data: { id: orderId, petId: 1, quantity: 1, status: 'placed', complete: false },
    });
    const first = await request.delete(`${API}/store/order/${orderId}`);
    expect(first.status()).toBe(200);
    const second = await request.delete(`${API}/store/order/${orderId}`);
    expect(second.status()).toBe(404);
  });

  // Docs: Order.status ∈ {placed, approved, delivered}; POST lists "400 Invalid Order".
  // Actual: 200 and the order is saved. See docs/alexmn/lab-11-api.md, T03 / bug report.
  test('DOC-GAP: an order with status "teleported" is rejected with 400', async ({ request }) => {
    const res = await request.post(`${API}/store/order`, {
      data: { id: orderId, petId: 1, quantity: 1, status: 'teleported', complete: false },
    });
    expect(res.status()).toBe(400);
  });
});
