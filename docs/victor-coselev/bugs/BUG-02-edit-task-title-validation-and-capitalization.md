# BUG-02: Editing a Task Allows Saving an Empty Title and Does Not Capitalize the First Letter

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-02 |
| **Severity** | Major |
| **Priority** | Medium |
| **Status** | Open |
| **Component** | Task List / Inline Edit (`src/components/TaskList.tsx`) |
| **Requirement** | Requirement 1: *"Title and Importance are required"*<br>Requirement 6: *"Title starts with a capital letter"*<br>Feature 3: *"Edit a task"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
When editing an existing task, the application neither validates that the **Title** is non-empty nor capitalizes the first letter of the updated **Title** upon saving, violating both Requirement 1 and Requirement 6.

## Preconditions
- At least one task exists in the task list (e.g., Title: `"Read book"`).

## Steps to Reproduce
1. Click **"Edit"** on the existing task.
2. Clear the **Title** input field completely and click **"Save Changes"**.
3. Click **"Edit"** on the task again, enter `"finish homework"` (starting with a lowercase `'f'`), and click **"Save Changes"**.

## Actual Result
- In Step 2, the task is saved with an empty Title (`""`).
- In Step 3, the task is saved with the lowercase Title `"finish homework"` instead of `"Finish homework"`.

## Expected Result
- Saving an edited task must not be allowed when the trimmed Title is empty.
- The edited Title should automatically start with a capital letter (consistent with Requirement 6 and task creation behavior).

## Root Cause (Code Analysis)
In `src/components/TaskList.tsx`:
- **Lines 28–38 (`handleSaveEdit`) & Lines 49–55 (`<input>`)**: `handleSaveEdit` directly passes `title: editTitle` to `onEditTask` without checking `editTitle.trim()` and without applying first-character capitalization (`capitalize(editTitle.trim())`).
