# Bug reports — Daybreak Tasks

**Tester:** Cristea Alexandru · **Branch:** CristeaAlexandruINFA241 · **App:** http://localhost:5173/ (`npm run dev`)

## BUG-01 · Edit · A title-only edit wipes the description, importance and category

**What happens:** pressing Save Changes after changing nothing but the title also clears the description and resets Importance to Low and Category to Hobby.

**How to reproduce:**
1. Add a task: title "Pay rent", description "Bank transfer", Importance High, Category Home.
2. Press Edit.
3. Change the title to "Pay rent today" and leave every other field alone.
4. Press Save Changes.

**Expected:** the title is the only thing that changes; "Bank transfer", High and Home survive.
**Actual:** the description is blank, Importance reads Low and Category reads Hobby.
**Evidence:** screenshots/11-13.png
**Severity:** High — a routine edit destroys data without warning.
**Priority:** P1 — Edit is one of the six features, and it loses what the user typed.

**Where it comes from:** in `src/components/TaskList.tsx`, `handleEdit()` (lines 20–26) seeds the edit form with hard-coded values (`''`, `'Low'`, `'Hobby'`) instead of the values the task already holds. The two dropdowns (lines 63 and 72) read `task.importance` and `task.label`, so they keep showing the old values while the state behind them carries the hard-coded ones — and `handleSaveEdit()` writes that state back.

## BUG-02 · Edit · Save Changes un-completes a finished task

**What happens:** opening Edit on a completed task and saving turns it back into an open task.
**How to reproduce:**
1. Add a task and press Mark Done (the button now reads Mark Undone).
2. Press Edit, then Save Changes.

**Expected:** the task stays completed.
**Actual:** it is no longer completed; the button reads Mark Done again.
**Evidence:** screenshots/21-22.png
**Severity:** Medium — the state comes out wrong after an edit, though one click puts it right.
**Priority:** P2

**Where it comes from:** `handleSaveEdit()` in `src/components/TaskList.tsx` writes `completed: false` on line 35 where it should carry over `task.completed`.

## BUG-03 · Edit · Cancel marks the task as done

**What happens:** pressing Cancel inside the edit form completes the task rather than abandoning the edit.
**How to reproduce:**
1. Add a task and leave it open.
2. Press Edit.
3. Press Cancel.

**Expected:** the form closes and the task is left exactly as it was — still open.
**Actual:** the card shows as completed: grey background, button reading Mark Undone.
**Evidence:** screenshots/31-32.png
**Severity:** Medium — a cancelled action changes state anyway.
**Priority:** P2

**Where it comes from:** the Cancel `onClick` (lines 88–93) in `src/components/TaskList.tsx` calls `onToggleComplete(task.id)` whenever the task is open. Cancel has no business doing anything except `setIsEditing(null)`.

## BUG-04 · Delete · One delete removes every task that shares a title

**What happens:** when two tasks carry the same title, deleting either of them deletes both.
**How to reproduce:**
1. Add two tasks titled "Buy milk", with different descriptions.
2. Press Delete on the first one.

**Expected:** only the task you clicked disappears.
**Actual:** both vanish.
**Evidence:** screenshots/41-42.png
**Severity:** High — user data is lost.
**Priority:** P1

**Where it comes from:** `src/components/TaskList.tsx` line 113 hands `task.title` to `onDeleteTask`, and `handleDeleteTasks()` in `src/App.tsx` (lines 39–41) removes everything where `task.title !== title`. It is the unique `id` that should travel down that path.

## BUG-05 · Sort · "Priority: Low to High" does not sort by importance

**What happens:** with Low to High selected, High lands first and Medium last; High to Low is scrambled the same way.
**How to reproduce:**
1. Add three tasks, Importance Low, Medium and High.
2. Read the order with "Priority: Low to High" selected.
3. Switch to "Priority: High to Low".

**Expected:** Low → Medium → High, reversed for High to Low.
**Actual:** Low to High shows High, Low, Medium (alphabetical by word); High to Low shows Medium, Low, High.
**Evidence:** screenshots/51-52.png
**Severity:** Medium — feature 6 does not do what its label promises.
**Priority:** P2

**Where it comes from:** the sort in `src/App.tsx` (lines 51–57) compares `a.importance.localeCompare(b.importance)`, which is an alphabetical comparison of the words. A rank map — Low 1, Medium 2, High 3 — is what is needed.

## BUG-06 · Persistence · Deletions, edits and completions return after a reload

**What happens:** after a page load, deleted tasks are back, while edits and Mark Done are gone.
**How to reproduce:**
1. Add a task and reload — it is still there.
2. Delete it and reload again.

**Expected:** the task stays deleted.
**Actual:** it reappears.
**Evidence:** screenshots/61-62.png
**Severity:** Medium — the list cannot be trusted after a reload.
**Priority:** P2

**Where it comes from:** in `src/App.tsx`, `localStorage.setItem` is called only inside `handleAddTask()` (line 30). `handleToggleComplete()`, `handleDeleteTasks()` and `handleEditTask()` all change state without ever saving it.

## BUG-07 · Add · A task can be created with an empty title

**What happens:** Create Task accepts a blank title, even though Title is listed as required.
**How to reproduce:**
1. Leave the title empty.
2. Press Create Task.

**Expected:** nothing is added, or a message says the title is required.
**Actual:** an empty task card appears in the list.
**Evidence:** screenshots/71.png
**Severity:** Medium — breaks requirement 1.
**Priority:** P3

**Where it comes from:** `handleSubmit()` in `src/components/TaskForm.tsx` (lines 196–213) never checks `title`. The button merely carries a `cursor-not-allowed` style (line 261); it is not disabled.
