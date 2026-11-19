# BUG-08: Importance and Category Dropdowns in Edit Mode Do Not Visually Update on Selection

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-08 |
| **Severity** | Major |
| **Priority** | Medium |
| **Status** | Open |
| **Component** | Task List / Inline Edit (`src/components/TaskList.tsx`) |
| **Requirement** | Feature 3: *"Edit a task"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
While editing a task, selecting a different option in either the **Importance** or **Category** `<select>` dropdown does not visually update the selected value shown in the form — both dropdowns remain visually stuck on the task's pre-edit values until **"Save Changes"** is clicked.

## Preconditions
- Create a task with Title `"Team sync"`, Importance `"Medium"`, and Category `"Work"`.

## Steps to Reproduce
1. Click **"Edit"** on `"Team sync"`.
2. Open the **Importance** dropdown and select `"High"`.
3. Open the **Category** dropdown and select `"Social"`.
4. Observe the displayed values inside both dropdowns before clicking **"Save Changes"**.

## Actual Result
- Both dropdowns immediately snap back to displaying `"Medium"` and `"Work"` while still in edit mode, making it appear as though changing Importance or Category does not work.

## Expected Result
- Both `<select>` controls must immediately display the newly selected `editImportance` and `editLabel` values during editing.

## Root Cause (Code Analysis)
In `src/components/TaskList.tsx` (lines 62–80):
```tsx
<select
    value={task.importance}
    onChange={(e) => setEditImportance(e.target.value as Importance)}
    className="block w-full mb-2 p-1 border rounded-md"
>
...
<select
    value={task.label}
    onChange={(e) => setEditLabel(e.target.value as Label)}
    className="block w-full mb-2 p-1 border rounded-md"
>
```
Lines 63 and 72 bind `value` to the immutable prop values `task.importance` and `task.label` instead of the local edit states `editImportance` and `editLabel`.
