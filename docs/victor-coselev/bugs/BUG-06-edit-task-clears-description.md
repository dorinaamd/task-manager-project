# BUG-06: Clicking "Edit" on a Task Clears Its Existing Description

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-06 |
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |
| **Component** | Task List / Inline Edit (`src/components/TaskList.tsx`) |
| **Requirement** | Feature 3: *"Edit a task"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
When a user clicks **"Edit"** on a task that has a non-empty Description, the Description textarea in edit mode opens completely blank. Saving the edit without re-typing the note permanently erases the task's Description.

## Preconditions
- Create a task with Title `"Prepare presentation"` and Description `"Include Q3 metrics and roadmap slides"`.

## Steps to Reproduce
1. Locate `"Prepare presentation"` in the task list and verify its Description is displayed.
2. Click **"Edit"** on the task.
3. Observe the **Description** textarea in the inline edit form.
4. Change the Title to `"Prepare board presentation"` and click **"Save Changes"**.

## Actual Result
- In Step 3, the Description textarea is empty (`""`) instead of pre-populated with `"Include Q3 metrics and roadmap slides"`.
- In Step 4, the task's original Description is wiped out after saving.

## Expected Result
- Clicking **"Edit"** must pre-populate the Description textarea with the task's current `description` value (`task.description`).

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
Line 23 explicitly resets `editDescription` to an empty string (`''`) instead of `task.description`.
