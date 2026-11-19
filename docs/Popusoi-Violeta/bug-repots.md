
# Bug Reports – Daybreak Tasks

## BUG-01 – Application allows adding tasks with an empty title

**Severity:** Medium

**Steps to Reproduce:**
1. Launch the Daybreak Tasks application in the browser.
2. Keep the task name field blank.
3. Press the Create Task button without entering a title.

**Expected Result:**
The system should reject the empty input and require the user to provide a valid task title before creating a new task.

**Actual Result:**
A new task is successfully added to the task list even though no title was entered.

**Status:** Open

## BUG-02 – Existing task note does not appear when editing

**Severity:** Medium

**Steps to Reproduce:**
1. Launch the Daybreak Tasks application in the browser.
2. Add a new task named "Test description" and enter "Important note" in the description field.
3. Confirm that the description is visible under the created task.
4. Select the Edit option for that task.

**Expected Result:**
When opening the edit form, the Description field should automatically contain the previously saved text "Important note".

**Actual Result:**
The Description field appears blank, although the task already contains a saved description.

**Status:** Open

**Code Location:** `src/components/TaskList.tsx`, inside the `handleEdit` function.

**Root Cause:**
The issue occurs because `setEditDescription('');` clears the description field whenever a task is opened for editing. As a result, the previously saved text from `task.description` is not displayed.

**Suggested Fix:**
Update the `handleEdit` function by changing `setEditDescription('');` to `setEditDescription(task.description);` so that the edit form shows the task's saved description.
