# Strategia de testare (Test Strategy)

**Autor:** Peșterev Daniel, TI-241  
**Aplicație:** Practice Software Testing (Toolshop Demo)  
**Adresă:** https://practicesoftwaretesting.com/  
**Sursă:** Laboratorul 8 – Testare Software (2026)

## Fișa site-ului

| Element | Descriere |
|---|---|
| Denumire și adresă | Practice Software Testing (Toolshop Demo) – https://practicesoftwaretesting.com/ |
| Funcționalități | Căutare produse; filtrare după categorie/preț; sortare; pagină de produs; adăugare/eliminare din coș; inițiere checkout. |
| Conturi și limite | Testare pe site demonstrativ, fără plăți reale și fără date personale reale. Testele descrise au fost făcute ca vizitator neautentificat. |
| Mediu observat în Lab. 7 | Google Chrome și Microsoft Edge; Desktop și emulare mobilă (375 px, 320 px și orientare peisaj). |

## Constatări din Laboratorul 7

- Lighthouse Desktop 1: Performance 94, Accessibility 95, Best Practices 77, SEO 92; Desktop 2: 97 / 95 / 77 / 92; Mobile: 81 / 96 / 77 / 92.
- Accesibilitate: titluri cu niveluri neconsecutive (exemplu „Combination Pliers”, `h5`) și lipsa unui reper semantic principal (`main` landmark).
- Best Practices: avertisment pentru API depreciat `StorageType.persistent`; erori raportate în consolă.
- Navigarea cu tastatura a permis accesul la produs, coș și Checkout; butonul „X” pentru eliminarea produsului nu a putut fi activat în încercarea efectuată (cauză neconfirmată).
- La 320 px, paginile de produse, coș și autentificare au rămas lizibile în capturi; elementele flotante pot acoperi temporar conținutul. Derularea verticală a funcționat.
- În Chrome și Edge au fost observate răspunsuri HTTP 401 la `/users/me` și `TypeError: Cannot read properties of null (reading cart_items)`. Nu s-a demonstrat că aceste erori blochează definitiv coșul.

## 1. Scop și domeniu

Verificarea stabilă a fluxurilor publice de cumpărare: descoperirea produselor, filtrare/sortare, afișarea detaliilor, coșul și trecerea spre checkout.

**În afara strategiei:** procesarea plăților reale, administrarea magazinului și modificarea datelor din backend.

## 2. Tehnici

- **Equivalence Partitioning (EP)** și **Boundary Value Analysis (BVA)** pentru câmpuri precum cantitate și preț.
- **Decision Table** pentru combinații de condiții din filtre și coș.
- **State Transitions** pentru stările coșului (gol → produs adăugat → produs eliminat).
- **Pairwise** pentru combinații browser × lățime × stare de autentificare.
- **Testare exploratorie** la modificările de interfață.

## 3. Niveluri și tipuri

Testare la nivel de sistem, din perspectiva utilizatorului. Teste funcționale pentru catalog, căutare, coș și checkout; teste nefuncționale pe fiecare versiune: Lighthouse, navigare exclusiv cu tastatura, lățimi mobile de 375/320 px și comparație între două browsere.

## 4. Mediu și date

Site demonstrativ accesat în Chrome și Edge, cu mod Incognito pentru măsurători Lighthouse. Produse și cantități de test; fără carduri bancare reale, date personale reale sau comenzi comerciale.

## 5. Instrumente

Chrome/Edge DevTools (Lighthouse, Console, Device Toolbar), capturi de ecran și document Word pentru evidența verificărilor. Defectele se înregistrează într-un registru de defecte cu pași de reproducere, rezultat așteptat/obținut și dovadă; nu se presupune utilizarea Jira/TestRail.

## 6. Priorități și reguli

Prioritate maximă: adăugare/eliminare produs și continuarea checkout, deoarece afectează fluxul de cumpărare. Urmează accesibilitatea cu tastatura și erorile de runtime, apoi filtrarea/sortarea și aspectul vizual.

Un defect **Critical** deschis împiedică recomandarea lansării; toate rezultatele trebuie susținute prin pași și dovezi.
