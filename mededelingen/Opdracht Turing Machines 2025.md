# Opdracht Turing Machines 2025

Maak een Turing Machine voor het volgende probleem:

Op de invoertape staat een binaire string (bestaan uit 0 en 1) dat een binair getale representeert. Voor het gemak nemen we aan dat het meest linkse bit 0 is.

Voorbeelden invoertape:
```
0
01
0101
0110
0111
```
Voor respectievelijk: ``` 0, 1, 5, 6,7```.
De Turing machine moet ervoor zorgen dat het getal binair met 1 wordt opgehoogd:
```
1
10
0110
0111
1000
```

## Deel 2
De invoer bestaat uit een aantal enen, een scheidingsteken - en voldoende nullen (bv 4).
Verhoog de rechterkant net zo vaak met 1 als er enen voor de - staan (tel het aantal enen):

```
111-0000   wordt xxx-0011
11111-0000 wordt xxxxx-0101
```
