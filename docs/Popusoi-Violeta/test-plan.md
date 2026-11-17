
# Test Plan – Daybreak Tasks

## 1. Objective

The objective of this test plan is to verify that the Daybreak Tasks application correctly manages tasks and provides a user-friendly experience.

Testing will focus on task creation, editing, completion, filtering, and input validation.

## 2. Test Environment

- Operating System: Windows
- Browser: Google Chrome
- Application: Daybreak Tasks
- Development Environment: Visual Studio Code
- Testing Method: Manual Testing

## 3. Test Cases

| ID | Test Case | Steps | Expected Result |
|---|---|---|---|
| TC-01 | Create a task with High importance | Enter a valid title, select High importance, and create the task | Task is created with High importance |
| TC-02 | Create a task with lowercase title | Enter a title starting with a lowercase letter and create the task | Application enforces the capital-letter requirement |
| TC-03 | Mark task as incomplete | Complete a task and click Mark Undone | Task status changes to incomplete |
| TC-04 | Change task category | Edit an existing task and select another category | Updated category is saved |
| TC-05 | Filter tasks by category | Create tasks in different categories and select one category filter | Only tasks from the selected category are displayed |
| TC-06 | Edit task description | Create a task with a description and open the edit form | Existing description appears in the edit form |

## 4. Defect Reporting

Each discovered defect will be documented with:

- Bug ID
- Bug title
- Severity
- Steps to reproduce
- Expected result
- Actual result
- Screenshots or other evidence
- Relevant source code location, if identified

## 5. Exit Criteria

Testing will be considered complete when:

- All six planned test cases have been executed.
- Actual test results have been recorded.
- At least two identified bugs have been documented.
- The root cause of one bug has been investigated in the source code.