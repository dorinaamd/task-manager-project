# BUG-05: Deleting, Editing, and Toggling Task Completion Are Not Persisted to `localStorage`

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-05 |
| **Severity** | Critical |
| **Priority** | High |
| **Status** | Open |
| **Component** | State & Storage Persistence (`src/App.tsx`) |
| **Requirement** | Feature 2: *"Delete a task"*<br>Feature 3: *"Edit a task"*<br>Feature 4: *"Mark a task complete / incomplete"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
While newly created tasks are saved to `localStorage` and reloaded when the page refreshes, any subsequent changes — **marking a task Done/Undone**, **editing a task**, or **deleting a task** — only update in-memory React state and are completely lost upon refreshing the page.

## Preconditions
- Create two tasks: `"Task One"` and `"Task Two"`.

## Steps to Reproduce
1. Click **"Mark Done"** on `"Task One"` (card turns darker gray and button reads `"Mark Undone"`).
2. Click **"Edit"** on `"Task Two"`, change its Title to `"Task Two Updated"`, and click **"Save Changes"**.
3. Click **"Delete"** on `"Task One"`.
4. Refresh the browser page (`F5` / `Cmd+R`).

## Actual Result
- `"Task One"` reappears in the list and is back in the incomplete (`"Mark Done"`) state.
- `"Task Two Updated"` reverts to its original `"Task Two"` values.

## Expected Result
- All state mutations (toggling completion, editing task fields, and deleting tasks) must persist to `localStorage` so the task list remains consistent across browser reloads.

## Root Cause (Code Analysis)
In `src/App.tsx`:
- `localStorage.setItem('tasks', ...)` is **only** called inside `handleAddTask` (line 30).
- `handleToggleComplete` (lines 33–37), `handleDeleteTasks` (lines 39–41), and `handleEditTask` (lines 43–47) call `setTasks(...)` without synchronizing the updated array to `localStorage` (and there is no `useEffect` syncing `tasks` to `localStorage`).
