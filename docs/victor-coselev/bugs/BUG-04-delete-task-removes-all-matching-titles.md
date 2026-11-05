# BUG-04: Deleting a Task Removes All Tasks Sharing the Same Title

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-04 |
| **Severity** | Critical |
| **Priority** | High |
| **Status** | Open |
| **Component** | Task Deletion (`src/App.tsx`, `src/components/TaskList.tsx`) |
| **Requirement** | Feature 2: *"Delete a task"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
Clicking **"Delete"** on a task deletes **every** task in the list that has the same Title, rather than deleting only the specific task card clicked (by its unique `id`).

## Preconditions
- Create two distinct tasks with the same Title (e.g., Title: `"Workout"` — one under Category `Hobby` with Importance `Low`, and another under Category `Home` with Importance `High`).

## Steps to Reproduce
1. Locate the two `"Workout"` task cards in the task list.
2. Click **"Delete"** on only **one** of the `"Workout"` task cards.

## Actual Result
- **Both** `"Workout"` tasks are deleted at the same time.

## Expected Result
- Only the single task card whose **"Delete"** button was clicked should be removed; all other tasks (even those with identical titles) must remain in the list.

## Root Cause (Code Analysis)
- In `src/components/TaskList.tsx` (lines 7 and 113), `onDeleteTask` passes `task.title` instead of the unique identifier `task.id`:
  ```tsx
  onClick={() => onDeleteTask(task.title)}
  ```
- In `src/App.tsx` (lines 39–41), `handleDeleteTasks` filters out every task matching that title:
  ```tsx
  const handleDeleteTasks = (title: string) => {
    setTasks(tasks.filter(task => task.title !== title));
  }
  ```
  (Note: The same anti-pattern also exists in the unused `src/components/TaskManager.tsx` lines 20–22.)
