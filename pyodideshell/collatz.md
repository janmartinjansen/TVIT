# Het vermoeden van Collatz

Een beroemd wiskundig vermoeden!
We beginnen met een getal n en delen dit door 2 als het even is, of vermenigvuldigen dit met 3 en tellen dan 1 op, als het oneven is.

```python
def collatz(n):
  while n > 1:
    if n % 2 == 0:  # n even
      n = n /2 
    else:
      n = 3*n + 1
  return True
```

Her vermoeden is dat deze functie altijd eindigt (dus op een gegeven moment wordt n 1).