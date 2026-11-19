## BUG-01 · Ștergerea task-urilor · Butonul „Delete" nu șterge definitiv task-ul

**Descriere:**
La apăsarea butonului `Delete` pe un task din dashboard, task-ul dispare aparent din listă, însă ștergerea nu este salvată permanent. După reîncărcarea paginii, task-ul reapare în lista de task-uri. Acest comportament indică faptul că ștergerea se aplică doar la nivel de interfață (UI), fără a fi persistată în sursa de date (backend, bază de date sau stocare locală).

**Pași de reproducere:**

*Precondiție:*
1. În dashboard există cel puțin un task.

*Pași:*
1. Deschide dashboard-ul și identifică task-ul care trebuie șters.
2. Apasă butonul `Delete` de pe acel task.
3. Verifică lista: task-ul dispare din interfață.
4. Reîncarcă pagina (Refresh / F5).
5. Verifică din nou lista de task-uri.

**Rezultat așteptat:**
După apăsarea butonului `Delete`, task-ul este eliminat din listă și rămâne șters inclusiv după reîncărcarea paginii, deoarece ștergerea este salvată permanent.

**Rezultat actual:**
Task-ul este eliminat din listă imediat după apăsarea butonului, dar după reîncărcarea paginii apare din nou în lista de task-uri, ca și cum nu ar fi fost șters niciodată.

**Severitate:** Ridicată (High). Ștergerea task-urilor este o funcționalitate de bază a aplicației, iar defectul face ca utilizatorul să nu poată elimina definitiv datele nedorite.

**Prioritate:** P1. Trebuie remediat înainte de commit/livrare, fiind un defect care blochează o funcționalitate esențială.

---

## BUG-02 · Ștergerea task-urilor · Butonul „Delete" șterge vizual întreaga listă de task-uri

**Descriere:**
La apăsarea butonului `Delete` pe un singur task, din interfață dispar toate task-urile din listă, nu doar cel selectat. Ștergerea este doar vizuală: datele nu sunt eliminate efectiv, iar după reîncărcarea paginii toate task-urile reapar. Comportamentul sugerează o problemă la actualizarea stării listei în UI (de exemplu, lista este golită în loc să fie filtrată după task-ul șters).

**Pași de reproducere:**

*Precondiție:*
1. În dashboard există mai multe task-uri (de exemplu, `Test 1`, `Test 2`, `Test 3`).

*Pași:*
1. Deschide dashboard-ul și verifică lista de task-uri.
2. Apasă butonul `Delete` pe un singur task (de exemplu, `Test 3`).
3. Verifică lista de task-uri.
4. Reîncarcă pagina (Refresh / F5).
5. Verifică din nou lista de task-uri.

**Rezultat așteptat:**
Doar task-ul selectat (`Test 3`) este eliminat din listă, iar celelalte task-uri rămân vizibile.

**Rezultat actual:**
Toate task-urile dispar din listă imediat după apăsarea butonului `Delete`. După reîncărcarea paginii, toate task-urile apar din nou, ceea ce arată că ștergerea a fost doar vizuală.

**Severitate:** Ridicată (High). Utilizatorul vede că i-au dispărut toate datele, ceea ce poate duce la confuzie și la pierderea încrederii în aplicație.

**Prioritate:** P1. Trebuie remediat înainte de commit/livrare, fiind legat direct de funcționalitatea de ștergere.
