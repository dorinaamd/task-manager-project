Bug 01 - Stergerea taskurilor se face dupa numele comun
Steps to reproduce:
1. Se acceseaza Daybreak Tasks
2. Se creaza cel putin doua taskuri cu acelasi nume
3. Se sterge unul din taskuri cu ajutorul butonului delete

Expected result: Se va sterge doar taskul selectat
 Actual result: Se sterg toate taskurile care au acelasi nume 

 Bug 02 - Titlul taskurilor se creeaza automat cu litera mare
 Steps to reproduce:
 1. Se acceseaza Daybreak Tasks
 2. Se introduce in caseta "What do you need to do?" numele taskului care sa se inceapa cu o litera mica
 3. Se face click pe butonul "Create task" pentru a crea taskul.

 Expected result: Se va crea taskul cu numele care sa introdus in caseta "What do you need to do?"
 Actual result: Se creeaza taskul automat cu prima litera mare.

 Bug 03 - Crearea taskului cu introducerea caracterelor speciale 
Steps to reproduce:
1. Se acceseaza Daybreak Tasks
2. Se introduce in caseta "What do you need to do?" numele taskului care sa contina caratere speciale (#@!%*&)
3. Se face click pe butonul "Create task" pentru a crea taskul.

Expected result: Nu se va crtea taskul, va aparea un mesaj de eroare
Actual result: Se creeaza taskul.

Bug 04 - - Crearea taskului cu introducerea literelor din alte alfabete 
Steps to reproduce:
1. Se acceseaza Daybreak Tasks
2. Se introduce in caseta "What do you need to do?" numele taskului format din litere arabe
3. Se face click pe butonul "Create task" pentru a crea taskul.

Expected result: Nu se va crtea taskul, va aparea un mesaj de eroare
Actual result: Se creeaza taskul.

Bug 05 - Crearea taskului fara titlu
Steps to reproduce: 
1. Se acceseaza Daybreak Tasks
2. Nu se introduce nimic la titlu
3. Se face click pe butonul "Create task" pentru a crea taskul.

Expected result: Taskul nu va fi creat
Actual result: Taskul este creat

