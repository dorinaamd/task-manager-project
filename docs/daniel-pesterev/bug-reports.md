## BUG1 – Creating a task with an empty title

**Severity:** Medium  
**Status:** Confirmed

### Preconditions
The Daybreak Tasks application is running.

### Steps to Reproduce
1. Open the application.
2. Leave the task title field empty.
3. Keep the default importance (Medium) and category (Work).
4. Click "Create Task".

### Expected Result
The application should prevent task creation and display a validation message because the title is required.

### Actual Result
A new task is created with an empty title.

---

## BUG2 – Editing a task allows an empty title

**Severity:** Medium  
**Status:** Confirmed

### Preconditions
At least one task exists.

### Steps to Reproduce
1. Create a task named "Cumpara produse".
2. Click "Edit".
3. Remove all text from the title field.
4. Change importance to Low and category to Hobby.
5. Save the changes.

### Expected Result
The application should reject the empty title and require a valid task title.

### Actual Result
The task is updated successfully with an empty title.

---

## BUG3 – Deleting one task removes all tasks with the same title

**Severity:** High  
**Status:** Confirmed

### Preconditions
Two tasks with the same title exist.

### Steps to Reproduce
1. Create a task named "Test laborator".
2. Create another task with the same title.
3. Verify that both tasks are displayed.
4. Click "Delete" on one of the tasks.

### Expected Result
Only the selected task should be deleted.

### Actual Result
Both tasks are deleted because they have the same title.


---

