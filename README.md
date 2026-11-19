# Daybreak Tasks

A small React + TypeScript task-tracking app, used as the course's shared practice application starting at **Session 9** (Git, GitHub &amp; Reading the Code). Front-end only, no backend.

## Features

1. Add a task
2. Delete a task
3. Edit a task
4. Mark a task complete / incomplete
5. Filter tasks by category
6. Sort tasks by importance

## Product requirements

1. Title and Importance are required
2. Description and Category are optional
3. Completeness is set to false by default
4. Importance is set to Medium by default
5. Category is set to Work by default
6. Title should start with a capital letter

Anything not covered above is intentionally left to interpretation — in real QA work, requirements are often incomplete, and part of the exercise is deciding what "correct" and "user-friendly" mean from context.

## Running it
saasdas
```
npm install
npm run dev
```

Then open http://localhost:5173/.

## How this project is used

Starting Session 9 (Git, GitHub &amp; Reading the Code), each student branches this repo (one branch per person, named with initials) to design a few test cases, find bugs through exploratory testing, and — for the first time in the course — read the actual source to confirm a bug's root cause. Later in the course, this same app becomes the target for UI test automation — nothing needs to be set up for that yet.

It needs to be pushed to its own GitHub repo (it currently lives as a folder in the course materials repo) with every student added as a collaborator — see `Laborator/lab-09/TEACHER-NOTES.md`.
