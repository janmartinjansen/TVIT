# IJVM simulator: de Fibonacci functie

De **Fibonacci** functie is een bekend voorbeeld
van een functie met een dubbel recursieve aanroep.
Dit zorgt er wel voor dat deze functie erg inefficient is. Het aantal aanroepen groeit immers exponentieel
met **n** (waarom?).

Hierbij Python functie met aanroep:

```python
def fib(n):
  if n < 2:
    return 1
  else:
    return fib(n-1) + fib(n-2)
}

print(fib(10))
```

Bestudeer de **IJVM** code voor **Fibonacci** en probeer de functie voor een aantal waarden uit. 
Pas daarbij op: voor **n > 10** duurt het erg lang.
Let vooral op hoe de stack wordt gebruikt.