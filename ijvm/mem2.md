# Memory en Heap
We maken een array in de ene functie en printen de inhoud ervan in een andere functie.

```python
def g(n):
  a = [0]*n
  k = 0
  while k != n:
    a[k] = 2*k+1
    k = k + 1
  return a

def f(a,n):
  k = 0
  while k != n:
    print(a[k])
  return 0

a = g(3)
f(a,3)

```

Wordt vertaald naar de volgende code:

```
    bipush 3
    call 1 2 11
    bipush 3
    call 2 1 22
    pop 
    stop
11  iload 0
    new
    istore 1
    bipush 0
    istore 2
22  iload 0
    iload 2
    isub
    iflt 33
    iload 2
    bipush 2
    imult
    bipush 1
    iadd
    iload 2
    iload 1
    iastore
    iload 2
    bipush 1
    iadd
    istore 2
    goto 22
33  iload 1
    ireturn
```