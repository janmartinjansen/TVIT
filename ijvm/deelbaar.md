# Deelbaar

Maak een functie **deelbaar(k,n)** die controleert of **n** deelbaar is door **k** door te starten met **0** 
en daar steeds **k** bij op te tellen tot de waarde gelijk of groter is aan **n**.
Als de waarde gelijk is aan **0** dan is **n** deelbaar door **k** (resultaat **1**) anders **0**.


```python
def deelbaar(k,n):
    s = 0
    while s < n:
        s = s + k
    if s == n:
        return 1
    else:
        return 0
        
print(deelbaar(3,12))
```

Zet de code om naar de simulator.
        
        
