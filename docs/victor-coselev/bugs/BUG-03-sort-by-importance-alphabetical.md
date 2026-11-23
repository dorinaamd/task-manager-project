# BUG-03: Sorting Tasks by Importance Sorts Alphabetically Instead of by Priority Level

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-03 |
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |
| **Component** | Task Filtering & Sorting (`src/App.tsx`) |
| **Requirement** | Feature 6: *"Sort tasks by importance"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
Selecting either **"Priority: Low to High"** or **"Priority: High to Low"** sorts tasks alphabetically by the importance string (`"High"`, `"Low"`, `"Medium"`) rather than by logical priority order.

## Preconditions
- Three tasks exist in the list with different Importance values:
  1. `"Task Low"` — Importance: `Low`
  2. `"Task Medium"` — Importance: `Medium`
  3. `"Task High"` — Importance: `High`

## Steps to Reproduce
1. Observe the task order when the sort dropdown is set to **"Priority: Low to High"** (default).
2. Change the sort dropdown to **"Priority: High to Low"** and observe the new task order.

## Actual Result
- **"Priority: Low to High"** displays tasks in alphabetical ascending order (`H → L → M`): **High → Low → Medium**.
- **"Priority: High to Low"** displays tasks in alphabetical descending order (`M → L → H`): **Medium → Low → High**.

## Expected Result
- **"Priority: Low to High"** must order tasks as: **Low → Medium → High**.
- **"Priority: High to Low"** must order tasks as: **High → Medium → Low**.

## Root Cause (Code Analysis)
In `src/App.tsx` (lines 51–57):
```tsx
const sortedTasks = filteredTasks.sort((a, b) => {
  if (sortOrder === 'asc') {
    return a.importance.localeCompare(b.importance);
  } else {
    return b.importance.localeCompare(a.importance);
  }
});
```
`String.prototype.localeCompare` compares strings lexicographically (`"High" < "Low" < "Medium"`) instead of mapping `Importance` levels to numeric weights (e.g., `{ Low: 1, Medium: 2, High: 3 }`).
