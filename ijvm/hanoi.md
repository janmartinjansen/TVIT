# IJVM simulator: Hanoi

De torens van **Hanoi** is een mooi voorbeeld van hoe recursie gebruikt kan worden om een schijnbaar moeilijk probleem in een paar regels op
te lossen. Net zoals **Fibonacci** bevat deze funtie een dubbele recursie waardoor het aantal stappen exponentieel groeit met de hoogte van de toren.

Het basis idee achter **Hanoi** is dat als je **n** schijven van **a** naar **b** moet verplaatsen: je eerst de bovenste **n-1** schijven van **a** naar **c** verplaatst (hiervoor vertrouw je erop dat recursie voor een kleiner probleem het correcte resultaat geeft); daarna verplaats je de onderste schijf van **a** naar **b**; als laatste verplaats je de **n-1** schijven van **c** 
weer naar **b**. Let op: alleen de print(a,b) voert een verplaatsing uit! In de IJVM wordt print(a) en daarna print(b) uitgevoerd.


```python
def hanoi(n,a,b,c):
  if n > 0:
    hanoi(n-1,a,c,b)
    print(a,b)
    hanoi(n-1,c,b,a)

hanoi(4,1,2,3)
```
Bestudeer de **Python** en **IJVM** code en voeg eventueel een **printstack** toe om te zien wat er met de stack gebeurt.
In de **IJVM** simulator moet een functie altijd een resultaat teruggeven (anders raakt de stackhuishouding in de war).
Daarom geeft de functie op het eind nog de willekeurige waarden 66 en 77 terug. 

**Vraag**: waarom gebeurt dit op 2 plaatsen (bestudeer hiervoor de IJVM code nauwkeurig)?

**Uitdaging**: maak een niet recursieve variant in **Python**.
        
        
