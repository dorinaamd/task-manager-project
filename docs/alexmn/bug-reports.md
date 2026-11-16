# Bug reports — Daybreak Tasks

**Tester:** Mancos Alexandru · **Branch:** alexmn · **App:** http://localhost:5173/ (`npm run dev`)

## BUG-01 · Edit · Editing only the title wipes description, importance and category

**Description:** after clicking Edit and changing only the title, Save Changes also erases the description and changes Importance to Low and Category to Hobby.
**Steps to reproduce:**
1. Create a task: title "Pay rent", description "Bank transfer", Importance High, Category Home
2. Click Edit
3. Change the title to "Pay rent today", do not touch anything else
4. Click Save Changes

**Expected:** only the title changes; description "Bank transfer", High and Home stay.
**Actual:** description is empty, Importance is Low, Category is Hobby.
**Attachment:** screenshots/bug-01-before.png, screenshots/bug-01-editing.png, screenshots/bug-01-after.png
**Severity:** High, every edit silently destroys data
**Priority:** P1, Edit is one of the six features and it loses user data

**Root cause (from code):** `src/components/TaskList.tsx`, `handleEdit()` (lines 20–26) fills the edit state with fixed values (`''`, `'Low'`, `'Hobby'`) instead of the task's own values. The two dropdowns (lines 63 and 72) are bound to `task.importance` and `task.label`, so they show the old values while the state holds the fixed ones, and `handleSaveEdit()` saves the state.

## BUG-02 · Edit · Save Changes marks a completed task as not completed

**Description:** editing a task that is marked done turns it back to not done.
**Steps to reproduce:**
1. Create a task and click Mark Done (button now says Mark Undone)
2. Click Edit, then Save Changes

**Expected:** the task stays completed.
**Actual:** the task is not completed (button says Mark Done again).
**Attachment:** screenshots/bug-02-before.png, screenshots/bug-02-after.png
**Severity:** Medium, wrong state after an edit, easy to fix by hand
**Priority:** P2

**Root cause (from code):** `src/components/TaskList.tsx`, `handleSaveEdit()` line 35 sets `completed: false` instead of keeping `task.completed`.

## BUG-03 · Edit · Cancel marks the task as done

**Description:** clicking Cancel in the edit form completes the task instead of leaving it unchanged.
**Steps to reproduce:**
1. Create a task (not completed)
2. Click Edit
3. Click Cancel

**Expected:** edit form closes, task unchanged and not completed.
**Actual:** task is shown as completed (button says Mark Undone, grey background).
**Attachment:** screenshots/bug-03-before.png, screenshots/bug-03-after.png
**Severity:** Medium, wrong state after a cancelled action
**Priority:** P2

**Root cause (from code):** `src/components/TaskList.tsx`, the Cancel `onClick` (lines 88–93) calls `onToggleComplete(task.id)` when the task is not completed. Cancel should only call `setIsEditing(null)`.

## BUG-04 · Delete · Deleting one task deletes every task with the same title

**Description:** two tasks with the same title are both removed when one is deleted.
**Steps to reproduce:**
1. Create two tasks with the title "Buy milk" (different descriptions)
2. Click Delete on the first one

**Expected:** only the first task is removed.
**Actual:** both tasks disappear.
**Attachment:** screenshots/bug-04-before.png, screenshots/bug-04-after.png
**Severity:** High, user data is lost
**Priority:** P1

**Root cause (from code):** `src/components/TaskList.tsx` line 113 passes `task.title` to `onDeleteTask`, and `src/App.tsx`, `handleDeleteTasks()` (lines 39–41) filters by `task.title !== title`. It should use the task `id`, which is unique.

## BUG-05 · Sort · "Priority: Low to High" does not sort by importance

**Description:** the sort puts High first when Low to High is selected, and Medium last.
**Steps to reproduce:**
1. Create three tasks: Importance Low, Medium, High
2. Look at the order with "Priority: Low to High" selected
3. Select "Priority: High to Low"

**Expected:** Low → Medium → High, and the reverse for High to Low.
**Actual:** Low to High shows High, Low, Medium (alphabetical); High to Low shows Medium, Low, High.
**Attachment:** screenshots/bug-05-low-to-high.png, screenshots/bug-05-high-to-low.png
**Severity:** Medium, feature 6 does not work as named
**Priority:** P2

**Root cause (from code):** `src/App.tsx`, the sort (lines 51–57) uses `a.importance.localeCompare(b.importance)`, which compares the words alphabetically. It needs a mapping such as Low = 1, Medium = 2, High = 3.

## BUG-06 · Persistence · Deleted, edited and completed changes come back after a refresh

**Description:** after a page refresh, deleted tasks reappear and edits or Mark Done are lost.
**Steps to reproduce:**
1. Create a task, refresh the page (it is still there)
2. Click Delete on it, then refresh the page

**Expected:** the task stays deleted.
**Actual:** the task is back.
**Attachment:** screenshots/bug-06-before.png, screenshots/bug-06-deleted.png, screenshots/bug-06-after-refresh.png
**Severity:** Medium, the list is not trustworthy after a reload
**Priority:** P2

**Root cause (from code):** `src/App.tsx`, `localStorage.setItem` is called only in `handleAddTask()` (line 30). `handleToggleComplete()`, `handleDeleteTasks()` and `handleEditTask()` change the state but never save it.

## BUG-07 · Add · A task with an empty title can be created

**Description:** Create Task accepts an empty title, although Title is required.
**Steps to reproduce:**
1. Leave the title empty
2. Click Create Task

**Expected:** no task is created, or a message says the title is required.
**Actual:** an empty task card is added.
**Attachment:** screenshots/bug-07.png
**Severity:** Medium, breaks requirement 1
**Priority:** P3

**Root cause (from code):** `src/components/TaskForm.tsx`, `handleSubmit()` (lines 196–213) has no check on `title`. The button only gets a `cursor-not-allowed` style (line 261), it is not disabled.
