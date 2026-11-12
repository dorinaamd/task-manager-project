# Bug Reports — Daybreak Tasks (task-manager-project)

**Laborator 9 · Software Testing · ASEM**
**Mediu de test:** Windows / macOS, Chrome (ultima versiune), `npm run dev` → `http://localhost:5173/`
**Versiune testată:** branch `main`, commit `c011dae`
**Referință:** README.md — 6 funcționalități și 6 cerințe de produs (R1–R6)

| ID | Funcționalitate | Rezumat | Severitate | Prioritate |
|----|-----------------|---------|------------|------------|
| BUG-01 | Delete | Ștergerea unei sarcini le șterge pe toate cu același titlu | Mare | P1 |
| BUG-02 | Edit / Cancel | Cancel marchează sarcina ca finalizată | Mare | P2 |
| BUG-03 | Edit | Descrierea, importanța și categoria se pierd la salvare | Mare | P1 |
| BUG-04 | Edit | O sarcină finalizată devine nefinalizată după Save | Medie | P2 |
| BUG-05 | Edit | Listele derulante din Edit nu își schimbă valoarea afișată | Medie | P2 |
| BUG-06 | Add | Se poate crea o sarcină fără titlu (încalcă R1) | Medie | P2 |
| BUG-07 | Add / Edit | Titlul nu începe cu literă mare după Edit sau cu spațiu în față (încalcă R6) | Mică | P3 |
| BUG-08 | Sort | Sortarea după importanță este alfabetică, nu Low → Medium → High | Medie | P2 |
| BUG-09 | Persistență | Delete, Edit și Mark Done nu se salvează; după refresh revin datele vechi | Mare | P2 |
| BUG-10 | UI | Cursor greșit pe butoanele Edit (așteptare) și Cancel (text) | Mică | P4 |

---

## BUG-01 · Delete · Ștergerea unei sarcini șterge toate sarcinile cu același titlu

**Descriere:** Butonul Delete de pe o singură sarcină elimină toate sarcinile care au exact același titlu, nu doar sarcina pe care s-a apăsat.
**Pași de reproducere:**
1. Creează sarcina „Buy milk”, descriere „first”, Importance High, Category Home.
2. Creează sarcina „Buy milk”, descriere „second”, Importance Low, Category Work.
3. Creează sarcina „Call mom”.
4. Apasă Delete pe cardul „Buy milk” cu descrierea „first”.

**Așteptat:** dispare doar cardul „Buy milk / first”; rămân „Buy milk / second” și „Call mom”.
**Obținut:** dispar ambele carduri „Buy milk”; rămâne doar „Call mom”.
**Atașament:** bug01.png
**Severitate:** Mare — pierdere de date fără avertisment, nu se poate anula.
**Prioritate:** P1 — titlurile repetate („Gym”, „Meeting”) sunt frecvente într-o listă de sarcini.

**Root cause (from code):** `src/components/TaskList.tsx`, linia 113 — butonul Delete apelează `onDeleteTask(task.title)`, iar în `src/App.tsx`, `handleDeleteTasks()` (liniile 39–41) filtrează după titlu: `tasks.filter(task => task.title !== title)`. Ștergerea ar trebui să folosească identificatorul unic `task.id`.

---

## BUG-02 · Edit · Butonul Cancel marchează sarcina ca finalizată

**Descriere:** Dacă deschizi editarea unei sarcini nefinalizate și apeși Cancel, sarcina devine finalizată (butonul arată „Mark Undone”, cardul devine gri), deși utilizatorul a renunțat la orice modificare.
**Pași de reproducere:**
1. Creează sarcina „Write report” (nefinalizată, buton „Mark Done”).
2. Apasă Edit.
3. Apasă Cancel fără să modifici nimic.

**Așteptat:** sarcina rămâne exact cum era: nefinalizată, buton „Mark Done”.
**Obținut:** sarcina este marcată ca finalizată, buton „Mark Undone”.
**Atașament:** bug02.png
**Severitate:** Mare — Cancel modifică date, deci face opusul rolului său; utilizatorul poate crede că a terminat o sarcină pe care n-a făcut-o.
**Prioritate:** P2 — se poate corecta manual cu „Mark Undone”, dacă utilizatorul observă.

**Root cause (from code):** `src/components/TaskList.tsx`, `onClick` al butonului Cancel (liniile 88–93): pe lângă `setIsEditing(null)`, apelează `onToggleComplete(task.id)` când `!task.completed`. Cancel trebuie doar să închidă formularul.

---

## BUG-03 · Edit · Descrierea, importanța și categoria se pierd la salvarea unei editări

**Descriere:** Când editezi doar titlul unei sarcini și apeși Save Changes, descrierea dispare, importanța devine Low și categoria devine Hobby, indiferent de valorile inițiale. În formularul de editare câmpul Description apare gol, deși sarcina avea descriere.
**Pași de reproducere:**
1. Creează sarcina „Gym session”, descriere „Leg day”, Importance High, Category Social.
2. Apasă Edit. Observă că Description este gol.
3. Schimbă doar titlul în „Gym session today”, fără să atingi celelalte câmpuri.
4. Apasă Save Changes.

**Așteptat:** „Gym session today”, descriere „Leg day”, Importance High, Category Social.
**Obținut:** „Gym session today”, fără descriere, Importance **Low**, Category **Hobby**.
**Atașament:** bug03.png
**Severitate:** Mare — orice editare distruge trei câmpuri, fără ca utilizatorul să observe în formular.
**Prioritate:** P1 — afectează fiecare utilizare a funcționalității Edit.

**Root cause (from code):** `src/components/TaskList.tsx`, `handleEdit()` (liniile 20–26) inițializează formularul cu valori fixe în loc de valorile sarcinii: `setEditDescription('')`, `setEditImportance('Low')`, `setEditLabel('Hobby')`. Ar trebui `task.description`, `task.importance`, `task.label`.

---

## BUG-04 · Edit · O sarcină finalizată devine nefinalizată după Save Changes

**Descriere:** Salvarea unei editări resetează starea de finalizare la false, chiar dacă sarcina era deja finalizată.
**Pași de reproducere:**
1. Creează sarcina „Pay bills”.
2. Apasă Mark Done (butonul devine „Mark Undone”).
3. Apasă Edit, apoi Save Changes fără modificări.

**Așteptat:** sarcina rămâne finalizată („Mark Undone”, card gri).
**Obținut:** sarcina devine nefinalizată („Mark Done”).
**Atașament:** bug04.png
**Severitate:** Medie — se pierde starea sarcinii; se poate corecta manual.
**Prioritate:** P2

**Root cause (from code):** `src/components/TaskList.tsx`, `handleSaveEdit()` (linia 35) trimite mereu `completed: false` în obiectul nou, în loc să păstreze `completed` al sarcinii editate.

---

## BUG-05 · Edit · Listele Importance și Category din Edit nu își schimbă valoarea afișată

**Descriere:** În formularul de editare, alegerea altei valori în lista Importance sau Category nu se vede: lista revine imediat la valoarea veche. După Save, valoarea salvată diferă de ce a arătat formularul.
**Pași de reproducere:**
1. Creează sarcina „Read book”, Importance Medium, Category Work.
2. Apasă Edit.
3. În lista Importance alege High.
4. Observă valoarea afișată în listă, apoi apasă Save Changes.

**Așteptat:** lista arată High; după salvare: Importance High, Category Work.
**Obținut:** lista revine la Medium; după salvare apare Importance High și Category Hobby (ce arată formularul nu corespunde cu ce se salvează).
**Atașament:** bug05.png
**Severitate:** Medie — utilizatorul nu poate vedea ce va salva; formularul arată date false.
**Prioritate:** P2

**Root cause (from code):** `src/components/TaskList.tsx`, liniile 63 și 72 — cele două `<select>` sunt legate de `value={task.importance}` și `value={task.label}` (valorile vechi ale sarcinii) în loc de `editImportance` și `editLabel`, deci nu se actualizează la `onChange`.

---

## BUG-06 · Add · Se poate crea o sarcină fără titlu

**Descriere:** Cerința R1 spune că titlul este obligatoriu, dar butonul Create Task creează o sarcină și cu titlu gol sau format doar din spații. Apare un card fără titlu. Același lucru se întâmplă la Edit: titlul poate fi șters complet și salvat.
**Pași de reproducere:**
1. Lasă câmpul „What do you need to do?” gol.
2. Apasă Create Task.
3. Scrie trei spații în câmpul de titlu și apasă din nou Create Task.

**Așteptat:** sarcina nu se creează; apare un mesaj că titlul este obligatoriu (sau butonul este dezactivat).
**Obținut:** se creează două carduri fără titlu (doar „Importance: Medium”, „Category: Work”).
**Atașament:** bug06.png
**Severitate:** Medie — încalcă direct cerința R1; sarcinile goale nu pot fi identificate.
**Prioritate:** P2

**Root cause (from code):** `src/components/TaskForm.tsx`, `handleSubmit()` (liniile 19–31) nu verifică titlul înainte de `onAddTask(newTask)`. Butonul de la linia 84 primește doar clasa `cursor-not-allowed` când titlul e gol, dar nu este dezactivat. Nici `handleSaveEdit()` din `TaskList.tsx` nu validează titlul.

---

## BUG-07 · Add / Edit · Titlul nu începe cu literă mare după Edit sau când are spațiu în față

**Descriere:** Cerința R6 spune că titlul începe cu literă mare. La creare, prima literă este transformată în majusculă, dar la editare nu. Dacă titlul începe cu un spațiu, nici la creare nu se aplică.
**Pași de reproducere:**
1. Creează sarcina „clean room” → apare „Clean room” (corect).
2. Apasă Edit, schimbă titlul în „clean kitchen”, apasă Save Changes.
3. Creează sarcina „ walk dog” (cu un spațiu la început).

**Așteptat:** „Clean kitchen” și „Walk dog”.
**Obținut:** „clean kitchen” și „ walk dog” (litere mici).
**Atașament:** bug07.png
**Severitate:** Mică — problemă de formatare, încalcă R6.
**Prioritate:** P3

**Root cause (from code):** `src/components/TaskForm.tsx`, funcția `capitalize()` este apelată doar în `handleSubmit()` (linia 24) și nu face `trim()`, deci majusculizează spațiul. `src/components/TaskList.tsx`, `handleSaveEdit()` (linia 31) salvează `editTitle` fără `capitalize()`.

---

## BUG-08 · Sort · Sortarea după importanță este alfabetică

**Descriere:** Opțiunea „Priority: Low to High” afișează ordinea High → Low → Medium, iar „High to Low” afișează Medium → Low → High. Sarcinile sunt sortate alfabetic după text, nu după nivelul de importanță.
**Pași de reproducere:**
1. Creează sarcina „A” cu Importance Medium, „B” cu Low, „C” cu High.
2. Alege „Priority: Low to High” (implicit).
3. Alege „Priority: High to Low”.

**Așteptat:** Low to High: B (Low), A (Medium), C (High). High to Low: C, A, B.
**Obținut:** Low to High: C (High), B (Low), A (Medium). High to Low: A (Medium), B (Low), C (High).
**Atașament:** bug08.png
**Severitate:** Medie — funcționalitatea 6 nu funcționează în niciuna din cele două opțiuni.
**Prioritate:** P2

**Root cause (from code):** `src/App.tsx`, liniile 51–57 — comparatorul folosește `a.importance.localeCompare(b.importance)`, adică ordine alfabetică („High” < „Low” < „Medium”). Ar trebui o hartă de ranguri, de ex. `{ Low: 1, Medium: 2, High: 3 }`.

---

## BUG-09 · Persistență · Ștergerea, editarea și finalizarea nu se salvează după refresh

**Descriere:** Sarcinile noi se salvează în browser și rămân după refresh, dar ștergerea, editarea și Mark Done nu. După reîncărcarea paginii, sarcinile șterse reapar și starea de finalizare se pierde.
**Pași de reproducere:**
1. Creează „Task one” și „Task two”.
2. Apasă Mark Done pe „Task one”.
3. Apasă Delete pe „Task two”.
4. Reîncarcă pagina (F5).

**Așteptat:** apare doar „Task one”, finalizată.
**Obținut:** apar „Task one” (nefinalizată) și „Task two” (sarcina ștearsă a revenit).
**Atașament:** bug09.png
**Severitate:** Mare — comportament inconsecvent: adăugarea se salvează, celelalte acțiuni nu; utilizatorul pierde munca.
**Prioritate:** P2 — README nu cere explicit persistență, dar aplicația o face parțial, deci rezultatul e incoerent.

**Root cause (from code):** `src/App.tsx` — `localStorage.setItem('tasks', ...)` este apelat doar în `handleAddTask()` (linia 30). `handleToggleComplete()`, `handleDeleteTasks()` și `handleEditTask()` modifică doar starea React, nu și `localStorage`.

---

## BUG-10 · UI · Cursor greșit pe butoanele Edit și Cancel

**Descriere:** La trecerea mouse-ului peste butonul Edit apare cursorul de așteptare (cerc care se învârte), ca și cum aplicația ar fi ocupată. Pe butonul Cancel apare cursorul de text (I-beam). Ambele sugerează altceva decât un buton apăsabil.
**Pași de reproducere:**
1. Creează o sarcină.
2. Ține mouse-ul deasupra butonului Edit.
3. Apasă Edit și ține mouse-ul deasupra butonului Cancel.

**Așteptat:** cursor de tip mână (pointer), ca la Mark Done și Delete.
**Obținut:** Edit: cursor „wait”; Cancel: cursor „text”.
**Atașament:** bug10.png
**Severitate:** Mică — doar cosmetic, nu afectează datele.
**Prioritate:** P4

**Root cause (from code):** `src/components/TaskList.tsx` — linia 120, clasa `cursor-wait` pe butonul Edit; linia 94, clasa `cursor-text` pe butonul Cancel.
