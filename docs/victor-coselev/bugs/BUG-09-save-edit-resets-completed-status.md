# BUG-09: Saving Edits on a Completed Task Resets Its Status to Incomplete

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-09 |
| **Severity** | Medium |
| **Priority** | Medium |
| **Status** | Open |
| **Component** | Task List / Inline Edit (`src/components/TaskList.tsx`) |
| **Requirement** | Feature 3: *"Edit a task"*<br>Feature 4: *"Mark a task complete / incomplete"*<br>Requirement 3: *"Completeness is false by default"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
Editing any field of an already completed task and clicking **"Save Changes"** resets `completed` back to `false`, reverting the task to an incomplete state.

## Preconditions
- Create a task `"Submit report"` and click **"Mark Done"** so its status becomes completed (button displays `"Mark Undone"`).

## Steps to Reproduce
1. Click **"Edit"** on the completed `"Submit report"` task.
2. Add or modify the Description (e.g., `"Submitted via portal"`) and click **"Save Changes"**.
3. Observe the completion state of the task card.

## Actual Result
- The task reverts to incomplete (`completed: false`), its background changes back to the incomplete card color, and the action button switches from `"Mark Undone"` back to `"Mark Done"`.

## Expected Result
- Requirement 3 specifies that completeness is `false` *by default* (upon creation). Editing an existing task must preserve its current `task.completed` status.

## Root Cause (Code Analysis)
In `src/components/TaskList.tsx` (lines 28–38):
```tsx
const handleSaveEdit = (id: string) => {
    onEditTask({
        id,
        title: editTitle,
        description: editDescription,
        importance: editImportance,
        label: editLabel,
        completed: false
    });
    setIsEditing(null);
};
```
Line 35 hardcodes `completed: false` instead of preserving `task.completed`.
