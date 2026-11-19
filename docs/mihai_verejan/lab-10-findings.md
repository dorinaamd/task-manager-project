# Lab 10 findings

## My tests

| Test                                                       | Rule | Result |
|------------------------------------------------------------|------|--------|
| the app loads and shows its heading                        | —    | Pass   |
| a new task appears in the list                             | —    | Pass   |
| importance defaults to Medium                              | R4   | Pass   |
| marking a task done changes its button to Mark Undone      | —    | Pass   |
| deleting one of two same-title tasks leaves the other      | —    | FAIL   |

## Failure: delete removes every task with the same title

- Steps: add "Call mom" twice, click Delete on one.
- Expected: 1 task left. Received: 0.
- Evidence: ![screenshot](delete-duplicate.png)
- Root cause: TaskList.tsx passes task.title; App.tsx filters by it.