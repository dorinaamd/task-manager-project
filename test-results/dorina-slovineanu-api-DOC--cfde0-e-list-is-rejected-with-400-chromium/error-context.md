# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dorina-slovineanu-api.spec.ts >> DOC-GAP an order status outside the list is rejected with 400
- Location: tests\dorina-slovineanu-api.spec.ts:40:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const API = 'https://petstore.swagger.io/v2';
  4  | const MY_ID = 4021998000; // my id from Step 1
  5  | 
  6  | test('an unknown pet returns 404', async ({ request }) => {
  7  |   const res = await request.get(`${API}/pet/987654321012`);
  8  |   expect(res.status()).toBe(404);
  9  |   const body = await res.json();
  10 |   expect(body.message).toBe('Pet not found');
  11 | });
  12 | 
  13 | test('my pet can be created and read back', async ({ request }) => {
  14 |   const created = await request.post(`${API}/pet`, {
  15 |     data: { id: MY_ID, name: 'Lab11-ana', photoUrls: [], status: 'available' },
  16 |   });
  17 |   expect(created.status()).toBe(200);
  18 | 
  19 |   const res = await request.get(`${API}/pet/${MY_ID}`);
  20 |   expect(res.status()).toBe(200);
  21 |   const pet = await res.json();
  22 |   expect(pet.name).toBe('Lab11-ana');
  23 |   expect(pet.status).toBe('available');
  24 | 
  25 |   await request.delete(`${API}/pet/${MY_ID}`);
  26 | });
  27 | 
  28 | test('my pet is gone after delete', async ({ request }) => {
  29 |   await request.post(`${API}/pet`, {
  30 |     data: { id: MY_ID + 1, name: 'Lab11-ana', photoUrls: [] },
  31 |   });
  32 | 
  33 |   const del = await request.delete(`${API}/pet/${MY_ID + 1}`);
  34 |   expect(del.status()).toBe(200);
  35 | 
  36 |   const res = await request.get(`${API}/pet/${MY_ID + 1}`);
  37 |   expect(res.status()).toBe(404);
  38 | });
  39 | 
  40 | test('DOC-GAP an order status outside the list is rejected with 400', async ({ request }) => {
  41 |   const res = await request.post(`${API}/store/order`, {
  42 |     data: { id: MY_ID + 3, petId: 7, quantity: 1, status: 'lost' },
  43 |   });
> 44 |   expect(res.status()).toBe(400);
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  45 | });
  46 | 
```