# Lab 11 · API testing - alexmn · my id: 2902200401

## 1. The docs say

- **POST /pet**: required = `name`, `photoUrls` (id optional); `status` ∈ {available, pending, sold}; responses listed = **only `405 Invalid input`** (no 200 listed); lock = yes (`petstore_auth`, write:pets / read:pets).
- **POST /store/order**: types = id int64, petId int64, quantity int32, shipDate date-time, status string, complete boolean; `status` ∈ {placed, approved, delivered}; responses listed = 200 successful operation, 400 Invalid Order; no field is marked required.
- **GET /store/order/{orderId}**: valid ids = integers 1–10 ("For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions"); other ids → 400 Invalid ID supplied / 404 Order not found.
- **Something the docs do NOT say**: whether `quantity` may be 0 or negative; whether an empty order `{}` is valid; what happens to a `status` outside the enum; POST /pet never lists a 200 although it obviously creates a pet; the 500 error is not documented anywhere.

## 2. Test cases

Expected is written from the docs. Sent with curl against `https://petstore.swagger.io/v2`.

| ID | Request | Input | Expected (docs) | Actual | P/F |
|-----|---------|-------|-----------------|--------|-----|
| T01 | POST /store/order, then GET it back | my id, qty 2, status placed | 200 + same body, GET returns it | 200 + same body; GET 200 same data | P |
| T02 | POST /store/order | quantity `-5` (also `0`) | 400 Invalid Order (a negative quantity is not a valid order; docs silent → see questions) | 200, saved; GET returns `quantity: -5` | F |
| T03 | POST /store/order | status `"teleported"` | 400 Invalid Order (enum: placed/approved/delivered) | 200, saved; status stays `teleported` | F |
| T04 * | POST /store/order | quantity `"two"` (text) | 400 Invalid Order | **500** `something bad happened` | F |
| T05 * | POST /store/order | shipDate `"tomorrow"` | 400 Invalid Order | **500** `something bad happened` | F |
| T06 | POST /store/order | `{}` | 400 Invalid Order (docs silent → see questions) | 200, saved with id `9223372000001099346`, petId 0, quantity 0 | F |
| T07 | DELETE /store/order/{id} twice | my id | 1st: 200; 2nd: 404 Order not found | 200 `{"message":"2902200401"}`; then 404 `Order Not Found` | P |
| T08 | POST /pet | no `name` (required) | 405 Invalid input (the only listed error) | 200, saved; GET returns the pet without a name | F |
| T09 | GET /store/order/{id} | my 10-digit id (after delete) | 404 Order not found | 404 `Order not found` | P |
| T10 | POST /pet | status `"flying"` | 405 Invalid input (enum) | 200, saved; GET returns `status: flying` | F |
| T11 * | POST /pet | `id: "abc"` (text) | 405 Invalid input | **500** `something bad happened` | F |
| T12 | GET /store/order/{id} | id `0` | 400 Invalid ID supplied | 404 `Order not found` | F |
| T13 | GET /store/order/{id} | id `abc` | 400 Invalid ID supplied | 404 with a leaked Java message `java.lang.NumberFormatException: For input string: "abc"` | F |

* = Swagger UI refuses to send this (type validation), so I sent it with curl. Code can send it too.

Warm-up with id 2902200401: GET (unknown) → 404; POST /pet → 200; GET → 200 same pet; DELETE → 200; GET → 404. All as predicted.

## Questions for the team

- Is `quantity` 0 or negative a valid order? The docs do not say.
- Is an empty order `{}` valid? The docs do not say, yet one is saved with a garbage id.
- Why does POST /pet list only `405` and no `200`?
- Invalid ids (`0`, `abc`) return 404, but the docs list `400 Invalid ID supplied`. Which is intended?

## 3. Bug report

**Title:** [POST /store/order] An order with a `status` outside the allowed list is saved with 200 instead of 400 when `status` is `"teleported"`

**Request:** `POST https://petstore.swagger.io/v2/store/order`

**Body sent:**

```json
{ "id": 2902200404, "petId": 1, "quantity": 1, "status": "teleported", "complete": false }
```

**Expected:** `400 Invalid Order` (docs: `status` is "Order Status", enum `placed`, `approved`, `delivered`; responses: "400 Invalid Order").

**Actual:** `200`, body `{"id":2902200404,"petId":1,"quantity":1,"status":"teleported","complete":false}`

**Proof it was saved:** `GET /store/order/2902200404` → `200` with `"status":"teleported"`. (The same happens with `quantity: -5`.)

**Severity:** Medium. Invalid data is accepted and stored, and any client reading orders will meet a status it cannot handle.

**Evidence:**

```bash
curl -X POST 'https://petstore.swagger.io/v2/store/order' \
  -H 'Content-Type: application/json' \
  -d '{"id":2902200404,"petId":1,"quantity":1,"status":"teleported","complete":false}'
curl 'https://petstore.swagger.io/v2/store/order/2902200404'
```

Related finding (separate report): the same endpoint returns **500** `something bad happened` for `quantity: "two"` and `shipDate: "tomorrow"` (T04, T05). A 500 on bad input is always a bug.

## 4. Automation

- Tests: 6 · passed 5 · failed 1 (`DOC-GAP: an order with status "teleported" is rejected with 400`)
- The red test matches: T03 / the bug report above.
- Break-it check on the first test: changing `404` to `200` gave `Expected: 200 / Received: 404`; changing `'Pet not found'` to `'pet not found'` gave `Expected: "pet not found" / Received: "Pet not found"`. Two different red failures, each on a different line, and both undone afterwards.
- Trace (from the red test): sent `POST /store/order` with `{"id":1795697949154767,"petId":1,"quantity":1,"status":"teleported","complete":false}`, got `200` (the order saved), took ≈ 860 ms.
