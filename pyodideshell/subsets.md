# Deelverzamelingen

Vind alle deelverzamelingen.

Bekijk bijvoorbeeld alle deelverzamelingen van [1,2,3]:

```python
as = [ [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3] ]
```

Een “kleinere” versie van dit probleem zijn de deelverzamelingen van [2,3]:

```python
bs = [ [],[2],[3],[2,3] ]
```

Als we het verschil tussen bs en as bekijken zijn dat de elementen:
```python
diff_as_bs = [ [1],[1,2],[1,3],[1,2,3] ]
```

Dit zijn alle elementen van bs met daar een 1 aan toegevoegd. We kunnen as dus construeren uit bs als:
```python
bs + [[1] + s for s in bs]
```

Het randgeval: subsets([])?

```python
subsets([]) == [[]]
```

Waarom geen:

```python
subsets([]) == []
```