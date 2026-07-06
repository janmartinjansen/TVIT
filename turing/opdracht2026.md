# Opdracht Turing Machines 2026

Maak een Turing Machine voor het volgende probleem:

Op de invoertape staat een binaire string dat een binair getal representeert. We nemen aan dat het getal groter dan 0 is.

Voorbeelden invoertape:
```
1
101
110
1000
```
Voor respectievelijk: ``` 1, 5, 6, 8```.
De Turing machine moet ervoor zorgen dat het getal binair met 1 wordt verlaagd:
```
0
100
101
0111
```

## Deel 2
De invoer bestaat uit een aantal enen, een scheidingsteken - en daarna een binair getal met waarde groter dan het aantal enen links.
Verlaag de rechterkant net zo vaak met 1 als er enen voor de - staan:

```
111-100   wordt xxx-001
11111-1001 wordt xxxxx-0100
```
