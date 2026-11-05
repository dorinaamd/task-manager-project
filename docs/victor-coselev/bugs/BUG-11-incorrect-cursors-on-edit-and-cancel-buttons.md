# BUG-11: Misleading Mouse Cursors on "Edit" (`cursor-wait`) and "Cancel" (`cursor-text`) Buttons

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-11 |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Component** | Task List UI (`src/components/TaskList.tsx`) |
| **Requirement** | Feature 3: *"Edit a task"* (UI/UX Usability) |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
Interactive buttons in the task card display inappropriate mouse cursors on hover: hovering over **"Edit"** displays a busy/loading cursor (`cursor-wait`), and hovering over **"Cancel"** (in edit mode) displays a text I-beam cursor (`cursor-text`).

## Preconditions
- At least one task exists in the task list.

## Steps to Reproduce
1. Hover the mouse pointer over the **"Edit"** button on any task card.
2. Click **"Edit"** to enter edit mode.
3. Hover the mouse pointer over the **"Cancel"** button.

## Actual Result
- Hovering **"Edit"** shows the OS busy/loading spinner cursor (`wait`), falsely suggesting the app is processing or unresponsive.
- Hovering **"Cancel"** shows the editable text selection I-beam cursor (`text`) instead of a clickable button cursor (and lacks a hover state).

## Expected Result
- Both **"Edit"** and **"Cancel"** buttons should display the standard clickable pointer cursor (`cursor-pointer`) on hover.

## Root Cause (Code Analysis)
In `src/components/TaskList.tsx`:
- **Line 120 ("Edit" button)**: Includes Tailwind utility class `cursor-wait`:
  ```tsx
  className="py-1 px-2 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-md cursor-wait"
  ```
- **Line 94 ("Cancel" button)**: Includes Tailwind utility class `cursor-text`:
  ```tsx
  className="py-1 px-2 bg-slate-500 text-white rounded-md ml-2 cursor-text"
  ```
