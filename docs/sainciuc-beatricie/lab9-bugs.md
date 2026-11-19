# Laboratorul nr. 9 – Testarea aplicației Daybreak Tasks

## 1. Scopul lucrării

Scopul lucrării este testarea funcționalităților aplicației Daybreak Tasks, identificarea erorilor și verificarea cauzelor acestora în codul sursă.

## 2. Instrumente utilizate

- Visual Studio Code
- React și TypeScript
- Playwright
- Chromium
- Git și GitHub

## 3. Testarea manuală

Am verificat funcționalitățile principale ale aplicației: adăugarea, editarea, ștergerea, finalizarea, filtrarea și sortarea sarcinilor.

Am verificat și comportamentul aplicației la introducerea datelor incorecte și după reîncărcarea paginii.

## 4. Testarea automatizată

Am creat fișierul `tests/sainciuc-beatricie.spec.ts`, în care am implementat 13 teste automatizate folosind Playwright.

Comanda utilizată:

`npx playwright test tests/sainciuc-beatricie.spec.ts --reporter=line --workers=1`

**Rezultatul final:**
- Total teste: 13
- Teste reușite (PASS): 7
- Teste eșuate (FAIL): 6

| ID | Test automatizat | Rezultat |
|---|---|---|
| TC01 | Crearea unei sarcini fără titlu | FAIL |
| TC02 | Transformarea primei litere a titlului în majusculă | PASS |
| TC03 | Editarea titlului unei sarcini | PASS |
| TC04 | Ștergerea unei sarcini | PASS |
| TC05 | Marcarea unei sarcini ca finalizată și nefinalizată | PASS |
| TC06 | Filtrarea sarcinilor după categorie | PASS |
| TC07 | Sortarea sarcinilor după importanță | FAIL |
| TC08 | Crearea unei sarcini cu titlul format doar din spații | FAIL |
| TC09 | Verificarea valorilor implicite | PASS |
| TC10 | Păstrarea sarcinilor după reîncărcarea paginii | PASS |
| TC11 | Ștergerea unei singure sarcini cu titlu duplicat | FAIL |
| TC12 | Păstrarea modificărilor după reîncărcarea paginii | FAIL |
| TC13 | Păstrarea stării de finalizare după reîncărcarea paginii | FAIL |

## 5. Buguri identificate

### BUG 1 – Aplicația permite crearea unei sarcini fără titlu

**Pași de reproducere:**
1. Deschid aplicația.
2. Las câmpul pentru titlu gol.
3. Apăs butonul Create Task.

**Rezultat așteptat:** Sarcina nu trebuie creată fără titlu.

**Rezultat obținut:** Aplicația creează o sarcină fără titlu.

**Cauza:** În `src/components/TaskForm.tsx` nu există o verificare care să oprească adăugarea sarcinii când titlul este gol. Butonul are doar o clasă CSS, fără atributul `disabled`.

**Soluție propusă:** Validarea titlului înainte de crearea sarcinii.

### BUG 2 – Sortarea după importanță este incorectă

**Pași de reproducere:**
1. Creez trei sarcini cu importanța Low, Medium și High.
2. Selectez sortarea crescătoare.

**Rezultat așteptat:** Low → Medium → High.

**Rezultat obținut:** High → Low → Medium.

**Cauza:** În `src/App.tsx`, funcția de sortare folosește `localeCompare()`, care compară valorile alfabetic.

**Soluție propusă:** Stabilirea unei ordini numerice pentru Low, Medium și High.

### BUG 3 – Ștergerea unei sarcini elimină toate sarcinile cu același titlu

**Pași de reproducere:**
1. Creez două sarcini cu titlul `Test duplicat`.
2. Apăs Delete la una dintre ele.

**Rezultat așteptat:** Se șterge doar sarcina selectată.

**Rezultat obținut:** Se șterg ambele sarcini.

**Cauza:** În `src/App.tsx`, ștergerea se realizează după `title`, nu după identificatorul unic `id`.

**Soluție propusă:** Ștergerea sarcinilor după `id`.

### BUG 4 – Modificările unei sarcini se pierd după reîncărcarea paginii

**Pași de reproducere:**
1. Creez sarcina `Test salvare`.
2. Modific titlul în `Test modificat`.
3. Apăs Save Changes.
4. Reîncarc pagina cu F5.

**Rezultat așteptat:** Titlul rămâne `Test modificat`.

**Rezultat obținut:** Titlul revine la `Test salvare`.

**Cauza:** Funcția `handleEditTask` din `src/App.tsx` actualizează lista sarcinilor, dar nu salvează modificările în `localStorage`.

**Soluție propusă:** Salvarea modificărilor în `localStorage`.

### BUG 5 – Starea de finalizare nu se păstrează după reîncărcarea paginii

**Pași de reproducere:**
1. Creez sarcina `Test finalizare`.
2. Apăs Mark Done.
3. Reîncarc pagina cu F5.

**Rezultat așteptat:** Sarcina rămâne finalizată, iar butonul afișează Mark Undone.

**Rezultat obținut:** Sarcina revine la starea nefinalizată, iar butonul afișează Mark Done.

**Cauza:** Funcția `handleToggleComplete` din `src/App.tsx` modifică starea sarcinii, dar nu o salvează în `localStorage`.

**Soluție propusă:** Salvarea stării de finalizare în `localStorage`.

## 6. Observație suplimentară

Testul TC08 a identificat și posibilitatea creării unei sarcini cu titlul format doar din spații.

Această problemă este legată de BUG 1, deoarece ambele apar din lipsa validării corecte a titlului.

Pentru rezolvare se poate utiliza metoda `trim()`, astfel încât să fie respinse atât titlurile goale, cât și cele care conțin numai spații.

## 7. Concluzie

În cadrul laboratorului am testat manual și automat aplicația Daybreak Tasks. Am implementat și executat 13 teste automatizate cu Playwright, dintre care 7 au trecut și 6 au eșuat.

Am identificat 5 buguri distincte, am analizat cauzele acestora în codul sursă și am propus soluții de remediere.

Lucrarea m-a ajutat să înțeleg procesul de testare a unei aplicații și importanța verificării funcționalităților înainte de utilizare.