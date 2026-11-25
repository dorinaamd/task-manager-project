import { test, expect } from '@playwright/test';

const API = 'https://petstore.swagger.io/v2';
const MY_ID = 4021998000; // my id from Step 1

test('an unknown pet returns 404', async ({ request }) => {
  const res = await request.get(`${API}/pet/987654321012`);
  expect(res.status()).toBe(404);
  const body = await res.json();
  expect(body.message).toBe('Pet not found');
});

test('my pet can be created and read back', async ({ request }) => {
  const created = await request.post(`${API}/pet`, {
    data: { id: MY_ID, name: 'Lab11-ana', photoUrls: [], status: 'available' },
  });
  expect(created.status()).toBe(200);

  const res = await request.get(`${API}/pet/${MY_ID}`);
  expect(res.status()).toBe(200);
  const pet = await res.json();
  expect(pet.name).toBe('Lab11-ana');
  expect(pet.status).toBe('available');

  await request.delete(`${API}/pet/${MY_ID}`);
});

test('my pet is gone after delete', async ({ request }) => {
  await request.post(`${API}/pet`, {
    data: { id: MY_ID + 1, name: 'Lab11-ana', photoUrls: [] },
  });

  const del = await request.delete(`${API}/pet/${MY_ID + 1}`);
  expect(del.status()).toBe(200);

  const res = await request.get(`${API}/pet/${MY_ID + 1}`);
  expect(res.status()).toBe(404);
});

test('DOC-GAP an order status outside the list is rejected with 400', async ({ request }) => {
  const res = await request.post(`${API}/store/order`, {
    data: { id: MY_ID + 3, petId: 7, quantity: 1, status: 'lost' },
  });
  expect(res.status()).toBe(400);
});
