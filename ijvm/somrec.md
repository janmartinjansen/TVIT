# IJVM simulator: Som recursief 
Ook de volgende Python code berekent de som van de getallen 1 t/m n, maar nu op recursieve wijze.
Bestudeer de bijbehorende **IJVM** code en simuleer deze. Kijk goed wat er op de stack gebeurt en vergelijk dit ook met de loop versie.

```python
def sumrec(n):
  if n == 0:
    return 0
  else :
    return (n + sumrec(n-1))

print(sumrec(10))
```
