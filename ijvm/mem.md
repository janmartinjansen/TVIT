# Memory en Heap
We maken een array en stoppen er een waarde en passen deze aan.

```python
a = [0]*3
a[1] = 5
a[2] = a[1] + 3
```

Wordt vertaald naar de volgende code (na de new staat de verwijzing naar het array boven op de stack, dus iload 0 haalt het array op).

```
bipush 3
new
bipush 5
bipush 1
iload 0
iastore
bipush 1
iload 0
iaload
bipush 3
iadd
bipush 2
iload 0
iastore
stop
```