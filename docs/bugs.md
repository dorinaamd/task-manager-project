hello world

bug 01 - stregerea tarskurilor se face dupa nuemele comun
Steps to reproduce:
1. Deschidem aplicația Daybreak Tasks.
2. Creez două sarcini cu același titlu  „Studiez”.
3. Încearcam să ștergi una dintre cele două sarcini.

Expected result :
Doar sarcina selectată trebuie să fie ștearsă. Cealaltă sarcină, care are același titlu, trebuie să rămână în listă.

Actual result:
Toate sarcinile cu același titlu sunt șterse în loc să fie ștearsă doar sarcina selectată.

bug 01 - Crearea sarcinilor fără un titlu valid

Steps to reproduce:
1. Deschidem aplicația Daybreak Tasks.
2. Introducem doar spații în câmpul Title.
3. Selectam importanța Medium.
4. Apasăm Create Task.

Expected result :
Aplicația trebuie să respingă crearea sarcinii și să afișeze un mesaj de eroare, deoarece titlul este obligatoriu.

Actual result:
Aplicația permite crearea sarcinii chiar dacă titlul conține doar spații.



bug 02 - Aplicația permite salvarea unui titlu gol la editarea sarcinii

Steps to reproduce:
1. Creez o sarcină cu titlul "Study".
2. Apasăm butonul Edit.
3. Ștergem tot textul din câmpul Title.
4. Apasăm butonul Save.

Expected result:
Aplicația nu ar trebui să permită salvarea unei sarcini fără titlu și ar trebui să afișeze un mesaj de avertizare.

Actual result:
Aplicația permite salvarea sarcinii chiar dacă titlul este gol.


bug 03 - Modificarea neintenționată a importanței la editarea titlului

Steps to reproduce:
1. Creez o sarcină cu titlul Read book, categoria Work și importanța High.
2. Apasăm butonul Edit.
3. Modificăm doar titlul în Read novel.
4. Apasăm Save.

Expected result:
Titlul trebuie să se modifice în Read novel, iar categoria Work și importanța High trebuie să rămână neschimbate.

Actual result:
După salvare, titlul se modifică, dar categoria se schimbă automat din Work în Hobby, iar importanța din High în Low, fără ca utilizatorul să le modifice.

bug 04 - Importanța sarcinii nu se modifică

Steps to reproduce:
1. Creez trei sarcini cu importanțe diferite: Low, Medium și High.
2. Apasăm Edit pentru sarcina cu importanța Low.
3. Schimbăm  importanța din Low în High.
4. Apasăm Save.
5. Verificăm importanța afișată și ordinea sarcinilor după sortare.

Expected result:
Importanța sarcinii trebuie să se schimbe din Low în High, iar sarcinile trebuie afișate în ordinea corespunzătoare importanței.

Actual result:
După salvare, importanța rămâne Low sau se schimbă în Medium, în loc să fie actualizată la High.

