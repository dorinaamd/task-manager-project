Salutare!

BUG-01 · Edit · Saving an edit resets description, importance and category

Description: when I edit a task and change only its title, the task loses its description, its importance becomes Low and its category becomes Hobby. The edit form even shows the old values (High, Social) in the dropdowns, so nothing warns the user that they will be lost.

Steps to reproduce:

Create a task: title Prepare QA report, description Bugs found in lab 9, importance High, category Social
Click Edit on this task
Change only the title to Prepare QA report v2, do not touch the other fields
Click Save Changes

Expected: only the title changes. Description stays Bugs found in lab 9, importance stays High, category stays Social.
Actual: the title is changed, but the description is empty, importance is Low and category is Hobby.

Attachment: BUG-01

Severity: High, every edit silently destroys data the user entered
Priority: P1, Edit is one of the six main features and the user cannot avoid the problem

Root cause (from code): src/components/TaskList.tsx, function handleEdit() (lines 23, 24 and 25) does not copy the task's values into the edit form. It sets setEditDescription(''), setEditImportance('Low') and setEditLabel('Hobby') instead of task.description, task.importance and task.label. The dropdowns look correct only because they display value={task.importance} and value={task.label} (lines 63 and 72), not the edit state that is actually saved.


BUG-02 · Saving · Deletes, edits and completed tasks are lost after a page refresh

Description: the app keeps tasks after a page refresh, but only new tasks. If I mark a task as done, delete a task or edit one, after F5 everything goes back to how it was before: the deleted task comes back and the completed task is not done anymore.

Steps to reproduce:

Create two tasks: Pay the rent (High, Home) and Book train tickets (Medium, Social)
Click Mark Done on Pay the rent
Click Delete on Book train tickets
Refresh the page (F5)

Expected: after the refresh only Pay the rent is in the list, and it is still done (button Mark Undone).
Actual: Book train tickets is back in the list and Pay the rent is not done anymore (the button says Mark Done again). An edited title also goes back to the old one after F5.

Attachment: BUG-02

Severity: High, the user thinks the changes are saved, but they are lost at the first refresh or when the page is closed
Priority: P1, it affects three of the six features (Delete, Edit, Mark Done)

Root cause (from code): in src/App.tsx only handleAddTask() saves the list with localStorage.setItem('tasks', ...) (line 30). The functions handleToggleComplete() (line 33), handleDeleteTasks() (line 39) and handleEditTask() (line 43) change the list only with setTasks(...) and never save it. On refresh, getTasksFromLocalStorage() reads the old list, the one from the last added task.


BUG-03 · Edit · Clicking Cancel in the edit form marks the task as done

Description: opening the edit form and then pressing Cancel changes the task to completed, even though Cancel should leave the task exactly as it was.

Steps to reproduce:

Create a task: title Call the dentist, importance High, category Home (it is not done, the button says Mark Done)
Click Edit
Without changing anything, click Cancel

Expected: the edit form closes and the task is still not done (button Mark Done).
Actual: the task becomes done: the card turns grey and the button now says Mark Undone.

Attachment: BUG-03

Severity: Medium, the task's status is wrong, but the user can see it and click Mark Undone
Priority: P2, users press Cancel often, and a task marked done by mistake can be forgotten

Root cause (from code): src/components/TaskList.tsx, the onClick of the Cancel button (lines 88 to 93) calls onToggleComplete(task.id) when !task.completed. Cancel should only call setIsEditing(null) and not change the completed state.


BUG-04 · Edit · A completed task becomes not done after editing

Description: if I edit a task that is already marked as done and save it, the task goes back to not done, even though I never clicked Mark Undone.

Steps to reproduce:

Create a task: title Send the homework, description Lab 9 to the teacher, importance High, category Work
Click Mark Done (the card turns grey, the button says Mark Undone)
Click Edit and change the title to Send the homework (lab 9)
Click Save Changes

Expected: the title changes and the task stays done (button Mark Undone).
Actual: the task becomes not done: the card is no longer grey and the button says Mark Done again.

Attachment: BUG-04

Severity: Medium, the task's status changes without the user's action, and a finished task shows up as still to do
Priority: P2, it happens every time a user corrects a task that is already done

Root cause (from code): src/components/TaskList.tsx, function handleSaveEdit() builds the saved task with completed: false (line 35), a fixed value, instead of keeping the state the task already had (task.completed).


BUG-05 · Sort · "Priority: Low to High" shows High, Low, Medium

Description: sorting by importance does not follow the importance order. With "Priority: Low to High" selected, the High task is shown first and the Medium task last.

Steps to reproduce:

Create three tasks: Read chapter 4 (Medium), Pay the internet bill (High), Practice guitar (Low)
In the sort dropdown, select "Priority: Low to High"

Expected: Low, Medium, High (Practice guitar, Read chapter 4, Pay the internet bill).
Actual: High, Low, Medium (Pay the internet bill, Practice guitar, Read chapter 4). "High to Low" is also wrong: it shows Medium, Low, High.

Attachment: BUG-05

Severity: Medium, the sort feature gives a wrong order every time
Priority: P3, no data is lost and the user can still read each task's importance

Root cause (from code): src/App.tsx, the sort function (lines 53 and 55) uses a.importance.localeCompare(b.importance), which compares the words alphabetically: High, Low, Medium. It should compare the importance level, for example with a map { Low: 1, Medium: 2, High: 3 }.


BUG-06 · Edit · An edited title can start with a lowercase letter

Description: the README says the title should start with a capital letter (requirement 6). When a task is added, the app capitalizes the first letter by itself, but when a task is edited it does not, so an edited title stays lowercase.

Steps to reproduce:

Create a task with the title buy a birthday gift (it is shown correctly as Buy a birthday gift)
Click Edit and type the title buy a birthday gift for mom
Click Save Changes

Expected: the title is saved as Buy a birthday gift for mom, with a capital letter, the same as when adding.
Actual: the title stays buy a birthday gift for mom, with a lowercase letter.

Attachment: BUG-06

Severity: Low, a visual problem, but it breaks a written requirement
Priority: P3, it does not stop the app from working

Root cause (from code): the function capitalize() exists only in src/components/TaskForm.tsx and is used only when adding (title: capitalize(title), line 24). In src/components/TaskList.tsx, function handleSaveEdit() saves title: editTitle (line 31) exactly as typed, without capitalize().

Note: the BUG-06 screenshot also shows BUG-01: after the edit, importance and category changed to Low and Hobby.