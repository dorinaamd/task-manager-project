# Lab 11 · API testing — Dorina Slovineanu · my id: 4021998000

## 1. The docs say

- **POST /pet**: required = `name`, `photoUrls`. `status` ∈ {available, pending, sold}. Responses listed = **only 405 Invalid input**. Lock = **yes** (`petstore_auth`, scopes `write:pets`, `read:pets`).
- **POST /store/order**: types = `id` int64, `petId` int64, `quantity` int32, `shipDate` date-time, `status` string, `complete` boolean. `status` ∈ {placed, approved, delivered}. No field is required. Responses listed = 200, 400 Invalid Order.
- **GET /store/order/{orderId}**: 
- **Something the docs do NOT say**:
  - The lock is shown on `POST /pet`, but nothing says what happens without a token.

## 2. Test cases

Expected is written from the docs, before Execute. "starred" = Swagger UI refused to send it, so it is sent from code in Step 8.

| ID | Request | Input | Expected (docs) | Actual | P/F |
|-----|----------------------------|-------------------------------------|-----------------------------|------------------------------------------------------------|-----|
| T01 | GET /pet/{petId} | my id, before creating it | 404 | 404 "Pet not found" | P |
| T02 | POST /pet, then GET | my id, name "Lab11-ana" | success, same pet back | 200, GET returns the same body | P |
| T03 | POST /store/order | my id, petId 7, quantity 2, placed | 200 + same body | 200 + same body | P |
| T04 | GET /store/order/{orderId} | my id (10 digits) | 400 (only 1–10 valid) | **blocked by Swagger UI**: "Value must be less than or equal to 10" | starred |
| T05 | POST /store/order | status "lost" | 400 Invalid Order | **200**, saved with status "lost" | **F** |
| T06 | POST /store/order | quantity "two" | 400 Invalid Order | **500** "something bad happened" | **F** |



## 3. Bug report

**Title:** `POST /store/order` saves an order with a status outside the documented list

**Request:** `POST https://petstore.swagger.io/v2/store/order`

**Body sent:**

```json
{ "id": 1503200547, "petId": 7, "quantity": 1, "status": "lost" }
```

**Expected:** 400 Invalid Order (docs: `status` is an enum with "placed", "approved", "delivered").

**Actual:** 200, body `{"id":1503200547,"petId":7,"quantity":1,"status":"lost","complete":false}`

**Proof it was saved:** `GET /store/order/1503200547` → 200, `"status": "lost"`.

**Severity:** Major, because the bad value is stored, not just answered. Every screen and report that groups orders by status will skip or break on "lost", and the same gap lets any other text in. Not Critical: no money or access is lost directly.

**Evidence:** the curl from Swagger UI (paste into Git Bash):

```bash
curl -X 'POST' \
  'https://petstore.swagger.io/v2/store/order' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{ "id": 1503200547, "petId": 7, "quantity": 1, "status": "lost" }'
```