# BUG-07: Editing a Task Overwrites Unchanged Importance to "Low" and Category to "Hobby"

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-07 |
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |
| **Component** | Task List / Inline Edit (`src/components/TaskList.tsx`) |
| **Requirement** | Feature 3: *"Edit a task"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
When entering edit mode on a task, the internal edit state initializes **Importance** to `"Low"` and **Category** to `"Hobby"` regardless of the task's actual values. If the user edits only the Title or Description and clicks **"Save Changes"** without touching the dropdowns, the task's Importance and Category are silently overwritten to `"Low"` and `"Hobby"`.

## Preconditions
- Create a task with Title `"Deploy release"`, Importance `"High"`, and Category `"Work"`.

## Steps to Reproduce
1. Verify `"Deploy release"` shows `Importance: High` and `Category: Work`.
2. Click **"Edit"** on `"Deploy release"`.
3. Update only the Title to `"Deploy v2.0 release"` (do not interact with the Importance or Category dropdowns, which still visually display `High` and `Work`).
4. Click **"Save Changes"**.

## Actual Result
- After saving, the task's Importance changes from `High` to **`Low`**, and its Category changes from `Work` to **`Hobby`**.

## Expected Result
- Entering edit mode must initialize `editImportance` to `task.importance` and `editLabel` to `task.label` so that unmodified fields retain their original values when saved.

## Root Cause (Code Analysis)
In `src/components/TaskList.tsx` (lines 20–26):
```tsx
const handleEdit = (task: Task) => {
    setIsEditing(task.id);
    setEditTitle(task.title);
    setEditDescription('');
    setEditImportance('Low');
    setEditLabel('Hobby');
};
```
Lines 24–25 hardcode `'Low'` and `'Hobby'` instead of passing `task.importance` and `task.label`. Because the `<select>` elements also mistakenly display `task.importance` and `task.label` (see `BUG-08`), the user receives no visual indication before saving that these fields will be overwritten.
