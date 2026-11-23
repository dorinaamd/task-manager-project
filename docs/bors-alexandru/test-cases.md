# Test Cases — Bors Alexandru

| ID     | Req | Steps                                                              | Expected                                          | Result        |
|--------|-----|--------------------------------------------------------------------|---------------------------------------------------|---------------|
| TC-1.1 | R1  | Type "Buy milk", click Create Task                                 | Task "Buy milk" appears                           | Pass          |
| TC-1.2 | R1  | Leave the title empty, click Create Task                           | No task is created                                | FAIL (BUG-02) |
| TC-1.3 | R1  | Type only spaces "   ", click Create Task                          | No task is created                                | FAIL          |
| TC-1.4 | R1  | Create "Buy milk", click Edit, clear the title, click Save Changes | Title stays "Buy milk"                            | FAIL          |
| TC-3.1 | R3  | Create "Buy milk"                                                  | Task shows the "Mark Done" button (not completed) | Pass          |
| TC-6.1 | R6  | Type "buy milk", click Create Task                                 | Task titled "Buy milk"                            | Pass          |
| TC-6.2 | R6* | Type "   buy milk   ", click Create Task                           | Task titled "Buy milk" (spaces trimmed)           | FAIL          |
| TC-C.1 | —   | Create "Buy milk", click Mark Done                                 | Button changes to "Mark Undone"                   | Pass          |
| TC-D.1 | —   | Create "Buy milk", click Delete, refresh the page                  | Task stays deleted after refresh                  | FAIL (BUG-01) |
| TC-D.2 | —   | Create "Call mom" twice, click Delete on the first                 | One task is left                                  | FAIL          |
| TC-E.1 | —   | Create "Buy milk", click Edit, then Cancel                         | Task still shows "Mark Done"                      | FAIL          |

\* The README does not say what happens to leading or trailing spaces in a title. The expected result of TC-6.2 is my assumption.

Each case is automated in `tests/bors-alexandru.spec.ts`.
