# BUG-10: Clicking "Cancel" While Editing an Incomplete Task Marks It as Completed

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-10 |
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |
| **Component** | Task List / Inline Edit (`src/components/TaskList.tsx`) |
| **Requirement** | Feature 3: *"Edit a task"*<br>Feature 4: *"Mark a task complete / incomplete"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
When editing an incomplete task, clicking **"Cancel"** exits edit mode **and** toggles the task's completion status to completed (`Done`), mutating task state instead of discarding changes.

## Preconditions
- Create a new task `"Call dentist"` (which is incomplete by default: `completed === false`, showing the `"Mark Done"` button).

## Steps to Reproduce
1. Click **"Edit"** on `"Call dentist"`.
2. Without saving, click **"Cancel"**.
3. Observe the task card's completion status.

## Actual Result
- `"Call dentist"` becomes marked as **completed** (card background changes to `bg-slate-200` and the toggle button changes to `"Mark Undone"`).

## Expected Result
- Clicking **"Cancel"** must exit edit mode without modifying any property or completion status of the task.

## Root Cause (Code Analysis)
In `src/components/TaskList.tsx` (lines 87–97):
```tsx
<button
    onClick={() => {
        setIsEditing(null)
        if (!task.completed) {
            onToggleComplete(task.id)
        }
    }}
    className="py-1 px-2 bg-slate-500 text-white rounded-md ml-2 cursor-text"
>
    Cancel
</button>
```
Lines 90–92 explicitly invoke `onToggleComplete(task.id)` whenever `!task.completed` is true.
