# If en While 

If en While zijn voorbeelden van jump (sprong) instructies: deze wijzigen de pc.
Let op: in ifeq, iflt, etc spring je als er aan de conditie voldaan is (de afhandeling van if en else staan daardoor andersom)!

### Eenvoudig voorbeeld If
Net zoals voor call gebruiken we labels om aan te geven waar we naartoe springen.
Let op: bipush -7 werkt niet! Als we een negatief getal willen invoeren doen we dat door 0 - getal te berekenen.

```python
def f(a):
  if a < 0:
    return 0 - a
  else:
    return a

print(f(3-8))
```
Wordt vertaald naar:

```
    bipush 3
    bipush 8
    isub
    call 1 0 11
    print
    stop
11  iload 0
    iflt 22
    iload 0
    ireturn
22  bipush 0
    iload 0
    isub
    ireturn
```
-----

### While
Er is geen aparte instructie voor While. Je gebruikt een combinatie van If en goto om een loop te maken.
 

```python
def s(n):
  a = 0
  while n!= 0:
    a = a + n
    n = n - 1
  return a

print(s(10))
```

Vertaalt naar de volgende code:

```
    bipush 10
    call 1 1 11
    print
    stop
11  bipush 0
    istore 1
22  iload 0
    ifeq 33
    iload 1
    iload 0
    iadd
    istore 1
    iload 0
    bipush 1
    isub
    istore 0
    goto 22
33  iload 1
    ireturn

```

### For loops
For loop moet je eerst naar een while loop omzetten. De code van boven kan gezien worden als de vertaling van:

```python
def s(n):
  a = 0
  for k in range(n):
    a = a + k
  return a

print(s(10))
```