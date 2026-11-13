# Test Plan – Daybreak Tasks

## 1. Objective

The objective of this test plan is to verify that the main features of the Daybreak Tasks application work correctly.

Testing will focus on task creation, editing, deletion, completion, and input validation.

## 2. Test Environment

- Operating System: Windows
- Browser: Google Chrome
- Application: Daybreak Tasks
- Development Environment: Visual Studio Code
- Version Control: Git and GitHub
- Runtime Environment: Node.js
- Testing Method: Manual Testing

## 3. Test Cases

| Test ID | Test Case | Steps | Expected Result |
|---|---|---|---|
| TC-01 | Create a task | Enter a valid task title and save | Task is created successfully |
| TC-02 | Empty task title | Try to create a task without a title | Application prevents invalid task creation |
| TC-03 | Complete a task | Mark an existing task as completed | Task status changes to completed |
| TC-04 | Delete a task | Delete an existing task | Task disappears from the task list |
| TC-05 | Edit a task | Modify the title of an existing task | Updated title is displayed |
| TC-06 | Refresh page | Create a task and refresh the browser | Task remains saved if persistence is required |

## 4. Defect Reporting

Each discovered bug will be documented with the following information:

- Bug ID
- Bug title and description
- Steps to reproduce
- Expected result
- Actual result
- Severity
- Screenshots or other evidence, if available

## 5. Exit Criteria

Testing will be considered complete when:

- All planned test cases have been executed.
- Test results have been recorded.
- At least two discovered bugs have been documented.
- One bug has been traced to a relevant location in the source code.