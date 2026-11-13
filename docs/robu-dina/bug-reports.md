# Bug Reports – Daybreak Tasks

## BUG-01 – Task can be created without a title

**Severity:** Medium

**Steps to Reproduce:**
1. Open the Daybreak Tasks application.
2. Leave the task title field empty.
3. Click the Create Task button.

**Expected Result:**
The application should prevent the creation of a task without a title.

**Actual Result:**
The application creates a task without a title.

**Status:** Open

## BUG-02 – Task description is missing in edit form

**Severity:** Medium

**Steps to Reproduce:**
1. Open the Daybreak Tasks application.
2. Create a task with the title "Test description" and the note "Important note".
3. Verify that the note appears below the task title.
4. Click the Edit button.

**Expected Result:**
The Description field should display the existing note "Important note".

**Actual Result:**
The Description field is empty, even though the task has an existing note.

**Status:** Open

**Code Location:** `src/components/TaskList.tsx`, function `handleEdit`.

**Root Cause:**
The statement `setEditDescription('');` resets the task description to an empty string instead of loading the existing description from `task.description`.

**Suggested Fix:**
Replace `setEditDescription('');` with `setEditDescription(task.description);`.