# Planul de testare (Test Plan)

**Autor:** Peșterev Daniel, TI-241  
**Aplicație:** Practice Software Testing (Toolshop Demo)  
**Adresă:** https://practicesoftwaretesting.com/  
**Sprint de testare propus:** 23–27.11.2026  

> Plan orientativ de exercițiu, nu un sprint oficial al proiectului.

## 1. Domeniu inclus / exclus

**IN:** căutare, filtre, sortare, detalii produs, coș (adăugare, schimbare cantitate, eliminare), trecere la autentificare/checkout, accesibilitate cu tastatura și comportament responsive.

**OUT:** plată efectivă (nu se efectuează tranzacții reale), panou de administrare (nu este accesibil public), integrarea serviciilor backend (nu există acces la cod/API intern).

## 2. Riscuri și ordinea testării

| Funcționalitate / risc | Probabilitate | Impact | Ordine |
|---|---|---|---|
| Eliminare din coș cu tastatura | Ridicată | Ridicat | 1 |
| Stabilitate coș / erori `cart_items` | Ridicată | Ridicat | 2 |
| Inițiere checkout și formulare | Medie | Ridicat | 3 |
| Interfață mobilă / elemente flotante | Medie | Mediu | 4 |
| Căutare, filtrare și sortare | Medie | Mediu | 5 |

Estimările de probabilitate și impact sunt evaluări propuse pentru laborator, nu statistici ale aplicației.

## 3. Abordare

Se aplică **State Transitions** pentru coș și **BVA/EP** pentru cantitate; se repetă fluxul de eliminare numai cu tastatura, cu evidențierea focusului. Se verifică erorile `/users/me` și `cart_items` în Console, apoi se compară Chrome/Edge.

Pentru cerințe nefuncționale se rulează Lighthouse de două ori Desktop și o dată Mobile, plus 375/320 px.

## 4. Mediu și date

Windows 11, Chrome și Microsoft Edge, site-ul demonstrativ; produse de test (de exemplu Bolt Cutters, $48.41), cantități 1 și 2, coș gol/cu produs. Datele de autentificare fictive se folosesc numai dacă sunt furnizate pentru test.

## 5. Cine și când

| Perioadă propusă | Responsabil | Activitate |
|---|---|---|
| 23.11.2026 | Student | Reproducerea problemei butonului X; focus și navigare cu tastatura |
| 24.11.2026 | Student | Coș, cantitate, checkout și verificare Console |
| 25.11.2026 | Student | Căutare, filtre, sortare și BVA/EP |
| 26.11.2026 | Student | Lighthouse, 375/320 px, Chrome vs Edge |
| 27.11.2026 | Student | Retestare, centralizare rezultate și raport |

## 6. Riscuri pentru desfășurarea planului

- Instabilitatea serviciului demonstrativ sau erorile HTTP 401 pot afecta reproducerea; se păstrează capturi, ora și pașii, apoi se reîncearcă ulterior.
- Modificarea aplicației în timpul sprintului poate schimba rezultatele; se notează versiunea afișată și se reexecută verificările cu risc ridicat.

## 7. Criterii de ieșire (propuneri verificabile)

- [ ] 100% din verificările planificate cu risc ridicat sunt executate și au rezultat documentat.
- [ ] Nu există defecte Critical deschise la momentul închiderii sprintului.
- [ ] Fiecare defect Major rămas deschis are descriere, severitate, responsabil și dovadă.
- [ ] Cel puțin 90% dintre verificările planificate au rezultat PASS; cele neexecutate sunt marcate separat.
- [ ] Verificarea de tastatură pentru eliminarea din coș este retestată și are rezultat PASS/FAIL/QUESTION justificat.

Aceste criterii definesc închiderea unui sprint viitor; nu reprezintă afirmația că sprintul a fost deja executat.

## 8. Definition of Ready (DoR) și Definition of Done (DoD)

**Poveste de utilizator propusă:** „Ca vizitator, vreau să elimin un produs din coș folosind numai tastatura, pentru a putea corecta comanda fără mouse.”

### Definition of Ready – înainte de începerea dezvoltării

- [ ] Criteriile de acceptare pentru eliminare cu tastatura sunt scrise și aprobate.
- [ ] Sunt definite tastele acceptate (Tab, Shift+Tab, Enter/Space) și comportamentul focusului.
- [ ] Există un scenariu de test cu un produs adăugat în coș.
- [ ] Mediul demonstrativ este accesibil în Chrome și Edge.
- [ ] Este stabilit rezultatul așteptat după eliminare: produsul dispare și totalul se recalculează.

### Definition of Done – înainte de declararea poveștii ca finalizată

- [ ] Codul modificat este revizuit și integrat conform procesului echipei.
- [ ] Există un test executat pentru accesarea și activarea butonului X exclusiv cu tastatura.
- [ ] Focusul este vizibil pe controlul de eliminare și nu există blocaj de navigare.
- [ ] Eliminarea actualizează lista produselor și totalul corect în Chrome și Edge.
- [ ] Nu există defecte Critical sau High deschise asociate poveștii; dovezile sunt atașate.

Listele DoR/DoD reprezintă acorduri propuse pentru această poveste, nu starea actuală verificată a implementării.
