# Test Plan — saucedemo.com, sprint of 16–20 November 2026

**Names:** Mancos Alexandru · **Group:** INFA241

## 1. Scope

**IN:** login with all six accounts; product list and sort; product page; cart add, remove and isolation between users; the three-step checkout with its required-field errors; logout and reset; the four non-functional checks (Lighthouse, keyboard only, 375 px / 320 px, Chrome and Firefox) on the login, product-list, cart and checkout pages.

**OUT, with reasons:**

- (a) a pass/fail time limit for `performance_glitch_user` — no agreed number exists, it is an open question from Lab 7;
- (b) landscape orientation and real phones — not covered in Lab 7 and no device available;
- (c) the pages behind the footer links — not our site;
- (d) payment — saucedemo has no payment step;
- (e) the "Dynamic Catalog" menu entry and the "Generate PDF order" button — seen during Lab 7 but not specified, so they get a 30-minute exploratory check instead of cases.

## 2. Risk and order

| Feature | Likelihood (H/M/L) | Impact (H/M/L) | Order | Why |
|---------|---|---|---|-----|
| Checkout, required fields and completion | M | H | 1 | The money path: a failure here would stop every order. |
| Login by account type (locked_out, error, problem) | M | H | 2 | Everything after it depends on it, and the accounts behave differently on purpose. |
| Cart add/remove and isolation between users | M | H | 3 | Wrong cart content means wrong orders; the Lab 1 case TC-005 targets leakage between users. |
| Keyboard access (focus ring, cart not tabbable) | H | M | 4 | Already failed in Lab 7 (B1, B2), so the likelihood is High; impact is Medium because the mouse still works. |
| Product list, sort and product pages | M | M | 5 | Wrong order or wrong product page misleads choice but does not block an order. |
| Logout, reset and error-message display | L | M | 6 | Rarely changes; the clipped login error (B3) is cosmetic. |

## 3. Approach

Follows the Strategy: decision table for login and checkout rules, EP + BVA on the three checkout fields, state transitions for Cart → Complete, a 30-minute exploratory session per special account. Two lines come from my Lab 7 list: the keyboard-only flow is re-run because it failed (B1, B2), and the clipped login error is re-checked at 320, 375 and 1280 px (B3).

## 4. Environment and data

Current Chrome (Brave 157 as a stand-in if Chrome is missing, versions recorded) and Firefox 160 on desktop, private windows. The six accounts with password `secret_sauce`; synthetic checkout data; an empty cart through "Reset App State" before each run.

## 5. Who and when

| Date | Who | What |
|------|-----|------|
| Mon 16 Nov | Me | Login (decision table, six accounts) and checkout rules (EP + BVA). |
| Tue 17 Nov | Me | Cart, isolation and state transitions; exploratory sessions for the special accounts. |
| Wed 18 Nov | Me | Keyboard-only re-run and Lighthouse on login and product list. |
| Thu 19 Nov | Me | Widths 375 px and 320 px; the same flow in Chrome and Firefox. |
| Fri 20 Nov | Me | Retest of failures, defect log, exit-criteria check. |

## 6. Risks to the plan

- The site changes between runs: during Lab 7 I found a "Dynamic Catalog" menu entry and a "Generate PDF order" button that my Lab 1 cases do not cover. **Mitigation:** record the date and what was seen at the start of each day and re-run all High-risk cases after any change.
- Only one tester, so there is no second pair of eyes. **Mitigation:** re-read the exit criteria and DoD as a stranger on Friday and note every line I could not tick.

## 7. Exit criteria

- [ ] All ten Lab 1 cases (TC-001 to TC-010) and every case for risk rows 1–3 have a recorded result and an evidence file name.
- [ ] 0 open Critical defects; every open Major defect has an owner and a recorded decision (fix or accept).
- [ ] The keyboard-only flow completes with the cart reachable and a visible focus ring at every stop, or each remaining gap is accepted in writing with its defect number.
- [ ] Lighthouse Accessibility is at least 90 on the login and product-list pages, and no overlap or sideways scrolling is seen at 375 px and 320 px.
- [ ] At least 90% of the planned cases pass, with the count shown in the results sheet.
