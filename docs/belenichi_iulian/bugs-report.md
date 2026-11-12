# Bug reports · Daybreak Tasks

## BUG-01 · Delete · Ștergerea unei sarcini șterge toate sarcinile cu același titlu

**Descriere:** a există două sau mai multe sarcini cu același titlu, apăsarea butonului **Delete** pe una dintre ele le șterge pe toate, nu doar pe cea pe care s-a dat clic.

**Pași de reproducere:**
1. Deschide aplicația la http://localhost:5173/.
2. Creează sarcina cu titlul `Cumpără lapte`, Importance `High`, Category `Home`.
3. Creează a doua sarcină cu exact același titlu `Cumpără lapte`, Importance `Low`, Category `Work`.
4. Pe cardul primei sarcini (High / Home) apasă **Delete**.

**Rezultat așteptat:** dispare doar sarcina pe care s-a apăsat Delete; cea de-a doua sarcină (Low / Work) rămâne în listă.

**Rezultat actual:** ambele sarcini dispar din listă.

---

## BUG-02 · Edit · Salvarea unei editări resetează descrierea, importanța, categoria și starea de finalizare

**Descriere:** dacă editezi doar titlul unei sarcini și apeși **Save Changes**, celelalte câmpuri nu se păstrează: descrierea se șterge, Importance devine `Low`, Category devine `Hobby`, iar o sarcină finalizată devine din nou nefinalizată. În formularul de editare, dropdown-urile afișează valorile vechi, deci utilizatorul nu are cum să observe ce se va salva.

**Pași de reproducere:**
1. Deschide aplicația la http://localhost:5173/.
2. Creează sarcina: titlul `Raport lunar`, descrierea `De trimis până vineri`, Importance `High`, Category `Work`.
3. Apasă **Mark Done** pe sarcină (cardul devine gri, butonul arată „Mark Undone”).
4. Apasă **Edit**. Observă că câmpul de descriere este deja gol, iar dropdown-urile arată `High` și `Work`.
5. Modifică doar titlul în `Raport lunar final`, fără să atingi dropdown-urile.
6. Apasă **Save Changes**.

**Rezultat așteptat:** se schimbă doar titlul. Descrierea rămâne `De trimis până vineri`, Importance `High`, Category `Work`, sarcina rămâne finalizată.

**Rezultat actual:** descrierea este goală, `Importance: Low`, `Category: Hobby`, sarcina apare din nou ca nefinalizată (butonul „Mark Done”).
