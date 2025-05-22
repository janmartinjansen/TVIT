# IJVM simulator: Som loop
De volgende Python code berekent de som van de getallen 1 t/m n.
Bestudeer de bijbehorende IJVM code en simuleer deze. Kijk goed wat er op de stack gebeurt.

```python
def sumloop(n):
  s = 0
  while n != 0:
    s = s + n
    n = n - 1
  return s

print(sumloop(10))
```