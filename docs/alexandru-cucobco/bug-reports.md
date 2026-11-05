# Rapoarte de Bug — Daybreak Tasks
**Autor:** Alexandru Cucobco

## BUG-01 · Delete · Ștergerea unei sarcini șterge toate sarcinile cu același titlu
**Descriere:** Dacă două sarcini au același titlu, apăsarea pe Delete le șterge pe amândouă.
**Pași de reproducere:**
1. Creează două sarcini cu titlul „Test”.
2. Apasă Delete pe prima sarcină.
**Așteptat:** Doar prima sarcină este ștearsă.
**Obținut:** Ambele sarcini dispar de pe ecran.
**Atașament:** delete-bug.png
**Severitate:** Mare
**Prioritate:** P1
**Root cause (from code):** `src/components/TaskManager.tsx`, funcția `deleteTask(title)` filtrează lista după `task.title !== title` în loc de `task.id` (iar `TaskList.tsx` trimite `onDeleteTask(task.title)`).

## BUG-02 · Edit · Apăsarea pe Cancel marchează sarcina nefinalizată ca fiind finalizată
**Descriere:** Când editezi o sarcină nefinalizată și apeși Cancel, starea ei se schimbă în finalizată.
**Pași de reproducere:**
1. Adaugă o sarcină nouă (nefinalizată).
2. Apasă pe butonul Edit, apoi apasă pe Cancel.
**Așteptat:** Sarcina rămâne nefinalizată (`completed: false`).
**Obținut:** Sarcina devine finalizată (`Mark Undone`).
**Atașament:** cancel-bug.png
**Severitate:** Medie
**Prioritate:** P2
**Root cause (from code):** `src/components/TaskList.tsx`, pe `onClick`-ul butonului Cancel există condiția `if (!task.completed) { onToggleComplete(task.id) }` care bifează forțat sarcina la anulare.
