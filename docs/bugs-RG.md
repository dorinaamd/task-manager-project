BUG01 - Titlul este acceptat cu prima litera minuscula
Steps to reproduce:
1. Pe localhost, in secventa de titlu ("What do you need to do?"), introduci textul "project"
2. Apasa "Create Task"

Expected result: Taskul nu este adaugat, se afiseaza un mesaj de avertizare/eroare.
Actual result: Taskul este adaugat, cu numele "project" transformat in "Project".


BUG02 - Stergerea unui task duce la stergerea tuturor taskurilor cu acelasi nume 
Steps to reproduce:
1. Pe localhost, creeam un task numit "Test", lasand celelalte criterii implicite
2. Cream un task nou tot numit "Test", modificand doar priority la "High"
3. Stergem unul dintre taskuri, si se observa stegerea ambelor taskuri
Expected results: La stergerea unui task "Test", trebuie sa fie sters doar taskul selectat, iar cealalalt task cu acelasi nume sa ramana neschimbate
Actual restul: Ambele taskuri sunt sterse

BUG03 - Se accepta adaugarea unui task folosind doar caractere speciale
Steps to reproduce:
1. Pe localhost, creeam un task numit "!!!", lasand celelalte criterii implicite
2. Apasam "Create Task"
Expected results: Apare un mesaj de avertizare ce spune ca taskul nu a fost adaugat din cauza formatului invalid
Actual result: Taskul este adaugat

BUG04 - Se accepta adaugarea unui task fara titlu
Steps to reproduce:
1. Pe localhost, creeam un task fara nume
2. Apasam "Create Task"
Expected results: Apare un mesaj de avertizare ce spune ca taskul nu a fost adaugat din cauza lipsei titlului
Actual result: Taskul este adaugat

BUG05 - Nu se modifica previewul la modificarea categoriei taskului
Steps to reproduce:
1. Pe localhost, creeam un task numit "Test", cu celelalte optiuni implicite
2. Apasam "Create Task"
3. Apasam "Edit", si apasam tipul
4. Alegem "Hobby"
Expected result: Sa se modifice previewul de la "Work" la "Hobby", inainte de a apasa butonul "Save Changes"
Actual result: Preview la categorie nu se modifica, doar dupa ce apesi "Save Changes" e clara modificarea.



