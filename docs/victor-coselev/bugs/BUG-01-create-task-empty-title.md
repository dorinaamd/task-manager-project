# BUG-01: Task Can Be Created With an Empty or Whitespace-Only Title

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-01 |
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |
| **Component** | Add Task Form (`src/components/TaskForm.tsx`) |
| **Requirement** | Requirement 1: *"Title and Importance are required"*<br>Requirement 6: *"Title starts with a capital letter"* |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
Users can submit the "Create Task" form when the **Title** input is completely empty or contains only whitespace characters, resulting in blank task cards being added to the task list. Additionally, entering leading spaces before a lowercase word bypasses first-letter capitalization.

## Preconditions
- The Daybreak Tasks application is running in the browser (`http://localhost:5173/`).

## Steps to Reproduce
1. Leave the **"What do you need to do?"** (Title) input field completely empty.
2. Hover over the **"Create Task"** button (notice the disabled-style `not-allowed` cursor) and click **"Create Task"**.
3. Type `"   "` (spaces only) into the Title input field and click **"Create Task"**.
4. Type `" buy milk"` (with a leading space and lowercase first letter) into the Title input field and click **"Create Task"**.

## Actual Result
- In Step 2, an empty task card with no title (`""`) is created and saved to `localStorage`.
- In Step 3, a visually blank task card (`"   "`) is created, and the button does not even show the `cursor-not-allowed` indicator.
- In Step 4, the task is created with title `" buy milk"` (starting with a space followed by a lowercase letter instead of `"Buy milk"`).

## Expected Result
- Form submission must be blocked whenever the trimmed Title is empty (`title.trim().length === 0`), with clear validation feedback or an actually `disabled` submit button.
- Leading/trailing whitespace should be trimmed before capitalizing the first character so the saved Title always starts with a capital letter.

## Root Cause (Code Analysis)
In `src/components/TaskForm.tsx`:
- **Lines 19–36 (`handleSubmit`) & Lines 41–47 (`<input>`)**: There is no `required` attribute on the Title `<input>` and no validation check (e.g., `if (!title.trim()) return;`) inside `handleSubmit`.
- **Lines 81–87 (`<button type="submit">`)**: The button only toggles the CSS class `cursor-not-allowed` when `!title` is truthy (`className={... ${!title && 'cursor-not-allowed'}}`), without setting the HTML `disabled` attribute (`disabled={!title.trim()}`). (When `title` is non-empty, this expression also injects the literal string `"false"` into `className`.)
- **Lines 15–17 (`capitalize`)**: `s.charAt(0).toUpperCase() + s.slice(1)` operates on `s[0]` prior to trimming whitespace, so a leading space leaves the first word uncapitalized.
