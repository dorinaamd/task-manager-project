# Test Strategy — saucedemo.com

**Names:** Mancos Alexandru · **Group:** INFA241

## 1. Goal and scope

Check that login, product list and sort, product page, cart, the three-step checkout and logout behave as the Lab 1 cases and the Lab 7 requirements say, and that the shop passes four quick quality checks.

Never in scope: saucedemo's servers and hosting, the pages behind the footer links (X, Facebook, LinkedIn) and any real payment or customer data.

## 2. Techniques

- **EP + BVA** on the three checkout fields (First name, Last name, Zip/Postal code).
- **Decision table** for login (account type × password right, wrong or empty).
- **State transitions** for Cart → Your information → Overview → Complete, including Cancel and back.
- **Pairwise** for browser × screen width × account.
- **Time-boxed exploratory testing** for every new menu entry or page and for the four special accounts (`problem_user`, `error_user`, `visual_user`, `performance_glitch_user`).

## 3. Levels and types

System level, through the browser UI. Functional types: smoke (login → product list), regression, confirmation of fixed bugs.

Four non-functional checks on every release:

1. Lighthouse (Accessibility at least 90 on the login and product-list pages).
2. Keyboard only (login → add → cart → remove → checkout, every control reachable and focus visible).
3. Phone width 375 px and 320 px (no cut-off, overlap or sideways scrolling).
4. A second browser (same behaviour and look in Chrome and Firefox).

## 4. Environment and data

- Current desktop Chrome and current Firefox, in private windows with no extensions; the exact versions are written down for every run.
- The six saucedemo accounts with password `secret_sauce`.
- Synthetic checkout data (for example First name `Test`, Last name `User`, Zip `2001`).
- The cart is emptied with "Reset App State" before each run.
- **Forbidden:** real credentials, real card or personal data, load or flood testing.

## 5. Tools

- A spreadsheet for test cases and results.
- A Word or Google Docs file for these documents, kept in one shared folder with the date in each file name.
- Lighthouse inside the browser DevTools.
- One defect-log table with a Where · What · When title, steps, expected and actual result, browser versions and an evidence file name.
- No Jira or TestRail.

## 6. Priorities and rules

- **Order:** login and session first, then checkout completion and required fields, then the cart, then product pages and sort, then logout and reset, then the four non-functional checks.
- No release with an open Critical defect.
- Every non-functional check that failed in the previous release is re-run before the next one.
- Every defect has a Where · What · When title and steps that someone else can repeat.
- This page is reviewed at every milestone.
