- Root cause: bug-ul are două părți.
  1. TaskList.tsx: onClick={() => onDeleteTask(task.title)} trimite titlul.
  2. App.tsx, handleDeleteTasks: tasks.filter(task => task.title !== title) șterge după titlu.
  Titlul nu e unic, deci ambele task-uri "Call mom" se șterg.