Bug Reports – Daybreak Tasks

Bug 1 – Aplicația permite salvarea unui task fără titlu

Description: Aplicația permite crearea și salvarea unui task fără completarea câmpului Title.

     Steps to reproduce:
1. Deschide formularul Add Task.
2. Lasă câmpul Title gol.
3. Completează celelalte câmpuri necesare. 
4. Apasă butonul de salvare.

Expected Result: Aplicația trebuie să solicite completarea titlului și să nu permită salvarea taskului fără acesta.
Actual Result: Taskul este salvat fără titlu.


Bug 2 – Ștergerea unui task elimină toate taskurile cu același titlu

Description: Atunci când există două taskuri cu același titlu, ștergerea unuia determină eliminarea ambelor taskuri.

     Steps to reproduce:
1. Creează două taskuri cu același titlu.
2. Completează descrieri diferite pentru fiecare task.
3. Salvează ambele taskuri.
4. Șterge unul dintre ele.

Expected Result: Trebuie să fie șters doar taskul selectat, iar celălalt trebuie să rămână în listă.

Actual Result: Ambele taskuri cu același titlu sunt șterse.


Bug 3 – Aplicația permite salvarea unui titlu care nu începe cu literă majusculă

Description: Aplicația permite salvarea unui task al cărui titlu începe cu un semn de punctuație, cifre sau alte simboluri, deși cerința specifică faptul că titlul trebuie să înceapă cu o literă majusculă.

      Steps to reproduce:
1. Deschide formularul Add Task.
2. Introdu în câmpul Title doar un semn de punctuație, de exemplu !.
3. Completează celelalte câmpuri necesare.
4. Apasă butonul de salvare.

Expected Result: Aplicația trebuie să verifice dacă titlul începe cu o literă majusculă și să nu permită salvarea unui titlu care nu respectă această cerință.

Actual Result: Aplicația permite salvarea titlurilor formate doar din semne de punctuație, cifre sau simboluri.


Bug 4 – Aplicația permite salvarea unui task cu titlul format doar din spații

Description: Aplicația permite crearea și salvarea unui task atunci când câmpul Title conține doar spații goale, fără text valid.

Steps to reproduce:
1. Deschide formularul Add Task.
2. Introdu doar spații în câmpul Title.
3. Completează celelalte câmpuri necesare.
4. Apasă butonul de salvare.
Expected Result: Aplicația trebuie să verifice dacă titlul conține text valid și să nu permită salvarea taskului dacă acesta este format doar din spații.

Actual Result: Taskul este salvat chiar dacă titlul conține doar spații.


Bug 5 – Aplicația permite introducerea unui titlu mai lung de 1000 de caractere

Description: Aplicația permite introducerea și salvarea unui titlu care depășește limita de 1000 de caractere.

Steps to reproduce:
1. Deschide formularul Add Task.
2. Introdu în câmpul Title un text care conține mai mult de 1000 de caractere.
3. Completează celelalte câmpuri necesare.
4. Apasă butonul de salvare.
Expected Result: Aplicația trebuie să limiteze lungimea titlului la maximum 1000 de caractere și să afișeze un mesaj de avertizare dacă limita este depășită.

Actual Result: Aplicația permite introducerea și salvarea unui titlu mai lung de 1000 de caractere.


Bug 6 – Aplicația permite salvarea unui task cu titlul format doar din cifre

Description: Aplicația permite crearea și salvarea unui task al cărui titlu conține doar cifre (de exemplu, „123”), fără niciun caracter alfabetic.

Steps to reproduce:
1. Deschide formularul Add Task.
2. Introdu „123” în câmpul Title.
3. Completează celelalte câmpuri necesare.
4. Apasă butonul de salvare.
Expected Result: Aplicația trebuie să solicite un titlu care să conțină cel puțin un caracter alfabetic și să nu permită salvarea unui titlu format exclusiv din cifre.

Actual Result: Aplicația permite salvarea taskului cu titlul format doar din cifre („123”).


Bug 7 – Aplicația șterge descrierea taskului când facem click pe "Edit".

Description: Aplicația nu păstrează textul introdus în câmpul Add a note. După salvarea taskului, la deschiderea formularului Edit, descrierea introdusă dispare.

Steps to reproduce:
1. Deschide formularul Add Task.
2. Introdu un titlu valid în câmpul Title.
3. Introdu un text în câmpul Add a note.
4. Apasă butonul de salvare.
5. Deschide taskul salvat și apasă Edit.
6. Verifică dacă textul introdus anterior în câmpul Add a note este afișat.
Expected Result: Aplicația trebuie să păstreze textul introdus în câmpul Add a note și să îl afișeze în formularul Edit.

Actual Result: Textul introdus în câmpul Add a note dispare atunci când este deschis formularul Edit.


Bug 8 – Aplicația modifică starea taskului după editarea titlului
Description: Aplicația modifică starea de completare a taskului după editarea și salvarea titlului acestuia, fără ca utilizatorul să schimbe manual această stare.

Steps to reproduce:
1. Deschide formularul Add Task.
2. Introdu un titlu valid și salvează taskul.
3. Marchează taskul ca finalizat.
4. Apasă butonul Edit.
5. Modifică doar titlul taskului.
6. Apasă butonul de salvare.
Expected Result: Aplicația trebuie să păstreze starea inițială a taskului (finalizat), chiar dacă titlul acestuia este modificat.

Actual Result: Aplicația modifică starea taskului după editarea și salvarea titlului.


Bug 9 – Aplicația sortează incorect taskurile după importanță
Description: La selectarea opțiunii de sortare „High to Low”, aplicația nu afișează taskurile în ordinea descrescătoare a importanței.

Steps to reproduce:
1. Creează mai multe taskuri cu importanțe diferite: High, Medium și Low.
2. Salvează toate taskurile.
3. Selectează opțiunea de sortare „High to Low”.
4. Verifică ordinea taskurilor afișate.
Expected Result: Taskurile trebuie afișate în ordinea descrescătoare a importanței: High, Medium, Low.

Actual Result: Aplicația afișează taskurile într-o ordine incorectă, care nu respectă nivelul de importanță selectat.


Bug 10 – Aplicația permite salvarea unui titlu care începe cu cifre și simboluri
 
 Description: Aplicația permite crearea și salvarea unui task al cărui titlu începe cu cifre și simboluri, deși cerințele specifică faptul că titlul trebuie să înceapă cu o literă majusculă.

Steps to reproduce:
1. Deschide formularul Add Task.
2. Introdu „1.A-B2” în câmpul Title.
3. Completează celelalte câmpuri necesare.
4. Apasă butonul de salvare.
Expected Result: Aplicația trebuie să verifice dacă titlul începe cu o literă majusculă și să nu permită salvarea unui titlu care începe cu cifre sau simboluri.

Actual Result: Aplicația permite salvarea taskului cu titlul „1.A-B2”.