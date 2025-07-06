# Voorbeelden

Bestudeer de volgende voorbeelden en run ze stap voor stap.
Iedere functie heeft tijdens de uitvoering een segment op de stack bestaande uit:
* eerst de argumenten van de functie (a en b voor de eerste functie)
* dan de lokale variabelen van de functie (c voor de eerste functie)
* dan het return adres en de oude lv

De argumenten van een functie en de lokale variabelen staan achter elkaar en worden dus gewoon doorgenummerd! 

De volledige toestand van het programma wordt bepaald door:
* de instructies van het programma
* wat er op de stack staat
* pc: de volgende instructie om uit te voeren
* sp: tot waar is de stack gevuld (de simulator laat alleen deze waarden zien)
* lv: waar beginnen de (lokale) variabelen van de huidige functie op de stack

Let goed op wat er met de stack gebeurt gedurende de uitvoer:

### Simpele functie aanroep

```python
def f(a,b):
  c = a + b
  return c

print(f(4,5))
```
Vertaalt naar de volgende code:

```
    bipush 4
    bipush 5
    call 2 1 11
    print
    stop
11  iload 0
    iload 1
    iadd
    istore 2
    iload 2
    ireturn
```

### Functie aanroep met extra optelling in print 
let op de waarde van LV op het moment dat de functie start:

```python
def f(a,b):
  c = a + b
  return c

print(6 + f(4,5))
```
Vertaalt naar de volgende code:

```
    bipush 6
    bipush 4
    bipush 5
    call 2 1 11  
    iadd
    print
    stop
11  iload 0
    iload 1
    iadd
    istore 2
    iload 2
    ireturn
```

### Functie die andere functie aanroept
Let op hoe er op de stack steeds een blok bijkomt per functie call en hoe LV verandert als g wordt aangeroepen:

```python
def f(a,b):
  c = g(a) + b
  return c

def g(n):
  return n + 1

print(f(4,5))
```

Vertaalt naar de volgende code:

```
    bipush 4
    bipush 5
    call 2 1 11
    print
    stop
11  iload 0
    call 1 0 22
    iload 1
    iadd
    istore 2
    iload 2
    ireturn
22  iload 0
    bipush 1
    iadd 
    ireturn
```
