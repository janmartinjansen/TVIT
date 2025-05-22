# IJVM simulator: Selection Sort
Om het gebruik van arrays en memory management te demonstreren volgt hieronder het selection sort algoritme.
In de functie **test** wordt er eerst een array van lengte 5 gecreëerd en gevuld met een aantal waarden.
Het array wordt geprint (printmem in IJVM). Hierna wordt de functie **selsort** aangeroepen. 
Na afloop wordt het array weer geprint.

```python
def test():
  a = [0] * 5
  n = 5
  a[0] = 6
  a[1] = 9
  a[2] = 3
  a[3] = 7
  a[4] = 2
  print(a)
  print(selsort(a,n))

def selsort(a,n):
  i = 0
  while i < n:
    m = i
    j = i + 1
    while j < n:
      if a[j] < a[m]:
        m = j
      j = j + 1
    h = a[i]
    a[i] = a[m]
    a[m] = h
    i = i + 1
  return a

test()
```
Bestudeer de code. De simulator laat ook steeds de inhoud van het geheugen zien. Let op: aan het begin van een array staat de lengte ervan.
Dit is nodig voor het intern geheugenbeheer. Met **step** kan je goed volgen wat er met het array gebeurt.
Hoewel de code tamelijk lang en ingewikkeld lijkt valt dit toch wel mee. Ayyar operaties hebben nu eenmaal een link aantal instructies nodig: 4 voor een store en 3 voor een load.