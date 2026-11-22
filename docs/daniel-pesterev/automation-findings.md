# Lab 10 – Automated Testing Findings

**Student:** Daniel Pesterev  
**Application:** Daybreak Tasks  
**Testing Tool:** Playwright  
**Browser:** Chromium  
**Date:** 22 November 2026

## 1. Objective

The objective of this laboratory was to implement automated UI tests using Playwright, verify the functionality of the Daybreak Tasks application, and identify software defects.

## 2. Test Results

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Application heading | Heading is visible | Heading displayed correctly | PASS |
| Create a task | Task appears in the list | Task created successfully | PASS |
| Empty task title | Empty title is rejected | Whitespace-only title accepted | FAIL |
| Delete a task | Task is removed | Task deleted successfully | PASS |
| Delete duplicate task | One task remains | Both tasks deleted | FAIL |

**Total:** 5 tests  
**Passed:** 3  
**Failed:** 2

## 3. Bug 1 – Empty Task Title

**Description:** The application allows users to create tasks with an empty or whitespace-only title.

**Steps to reproduce:**
1. Open Daybreak Tasks.
2. Enter three spaces in the task title field.
3. Click "Create Task".
4. Observe the task list.

**Expected Result:** The application should reject the task.

**Actual Result:** A task with an empty-looking title is created.

**Playwright Error:**
- Expected: 0
- Received: 1

**Possible Cause:** Missing validation for whitespace-only titles.

**Evidence:** `evidence/empty-title-failure.png`

## 4. Bug 2 – Duplicate Task Deletion

**Description:** Deleting one task also removes other tasks with the same title.

**Steps to reproduce:**
1. Create two tasks named "Duplicate Task".
2. Click "Delete" on one task.
3. Observe the remaining task list.

**Expected Result:** One task should remain.

**Actual Result:** Both tasks are deleted.

**Playwright Error:**
- Expected: 1
- Received: 0

**Possible Cause:** Tasks are deleted using their titles instead of unique identifiers.

**Evidence:** `evidence/duplicate-task-failure.png`

## 5. Conclusion

Five automated UI tests were implemented using Playwright and Chromium. Three tests passed successfully, while two tests failed because of defects in the application.

Playwright helped identify and reproduce these problems automatically. The generated HTML report and failure traces provide additional evidence.

The application source code was not modified because the purpose of this laboratory was to detect and document software defects.