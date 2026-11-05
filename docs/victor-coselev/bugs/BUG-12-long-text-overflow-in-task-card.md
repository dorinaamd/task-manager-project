# BUG-12: Long Unbroken Text Overflows Task Card Container and Multi-Line Descriptions Lose Line Breaks

| Field | Value |
| :--- | :--- |
| **Bug ID** | BUG-12 |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Component** | Task Card Display (`src/components/TaskList.tsx`) |
| **Requirement** | Feature 1: *"Add a task"* (UI Layout & Formatting) |
| **Environment** | Web Browser (Vite + React 18.3.1, TypeScript) |

## Summary
Task cards do not wrap long unbroken strings (such as URLs or long continuous words) in the **Title** or **Description**, causing text to overflow horizontally outside the card border and overlap adjacent cards. Additionally, multi-line notes entered via `Enter` in the Description `<textarea>` are collapsed into a single line when rendered.

## Preconditions
- The Daybreak Tasks application is running in the browser.

## Steps to Reproduce
1. Create a task with a long unbroken string in the Title or Description (e.g., `"https://example.com/very/long/documentation/path/without/spaces/that/exceeds/the/card/width/substantially"`).
2. Create a second task with Title `"Shopping list"` and a multi-line Description using `Enter`:
   ```text
   - Apples
   - Bread
   - Coffee
   ```
3. Inspect how both task cards render in the grid.

## Actual Result
- In Step 1, the text extends past the right border of the `.task-item` card, breaking the grid layout and overlapping neighboring cards.
- In Step 2, all line breaks are collapsed and rendered inline as `"- Apples - Bread - Coffee"`.

## Expected Result
- Long unbroken strings in both Title and Description should wrap cleanly inside the `.task-item` boundaries (`break-words` / `overflow-wrap: anywhere`).
- Multi-line descriptions entered in the `<textarea>` should preserve line breaks (`whitespace-pre-line` or `whitespace-pre-wrap`).

## Root Cause (Code Analysis)
In `src/components/TaskList.tsx` (lines 101–102):
```tsx
<h3 className="text-lg font-semibold">{task.title}</h3>
<p className="text-sm">{task.description}</p>
```
Neither element includes word-wrapping utilities (`break-words`), and `<p>` omits `whitespace-pre-wrap` / `whitespace-pre-line` despite `TaskForm` providing a multi-line `<textarea rows={3}>`.
