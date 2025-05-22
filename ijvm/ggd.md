# IJVM simulator: Grootste gemene deler

Het **ggd** algoritme berekent voor twee gehele getallen **n** en **m** het grootste getal wat beide deelt. Dus **ggd(9,12) = 3**.
Er bestaat een efficiente manier om dit te bereken door steeds het kleinste getal van het grootste af te trekken tot het resultaat **0** is. Het andere getal is dan de grootste gemene deler.

``` ggd(9,12) = ggd(9,3) = ggd(6,3) = ggd(3,3) = ggd(0,3) = 3```

```python
def ggd(n,m):
  if n == 0:
    return n
  elif m == 0:
    return m
  elif m > n:
    return ggd(m-n,n)
  else:
    return ggd(n-m,m)
```
Bestudeeer de **IJVM** code van **ggd**. Voeg bv nog een **printstack** instructie toe aan het begin van de functie, zodat je kunt zien hoe de stack groeit.
Probeer zelf ook een niet recursie versie van **ggd** te maken. Eerst in Python en vertaal deze daarna naar **IJVM**.