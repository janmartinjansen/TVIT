# Eindige automaat in Python

We laten aan de hand van twee voorbeelden zien hoe je een Python programma maakt dat invoer stringen voor een Eindige Automaat
accepteerd.

Aantal a's gevolgd door 1 b:

![Plaatje](./autopython/vb1.svg)

```python
def vb1(inp):
    state = 1
    end = [2]
    for c in inp:
        if state == 1:
            if c == 'a':
                state = 1
            elif c == 'b':
                state = 2
            else:
                return False
        elif state == 2:
            return False
    return state in end


print(vb1('aaaaab'))
```

Het omzetten van een eindige automaat naar een Python programma is tamelijk rechtoe-rechtaan.
De kern is een for-lus over de invoerstring. Afhankelijk van de waarde van het huidige symbool kan de state veranderen.
Als er geen overgang mogelijk is, wordt er False teruggegeven. Als de invoerstring op is, moet er nog gecontroleerd worden of de huidige toestand een eindtoestand is.

Omdat iedere Eindige Automaat in Python is uit te drukken, is het formalisme van Python in ieder geval net zo krachtig als dat van Eindige Automaten!

