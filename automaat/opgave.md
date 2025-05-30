# Eindige Automaten

Maak een deterministisch eindige automaat die strings herkent bestaande uit a's en b's, waarvoor geldt:

1. de string bestaat uit een aantal a's gevolgd door net zoveel b's, waarbij het aantal a's niet groter is dan 4.
2. het aantal a's is even.
3. een oneven aantal a's gevolgd door een even aantal b's.
4. het aantal a's is even en het aantal b's is oneven.
5. meer a's dan b's (kan dat).
6. de string begint en eindigt met een a (let op het bijzondere geval).
7. de string begin met a gevolgd door alleen maar b's of begint met b gevolgd door alleen maar a's.

# Niet deterministische Automaten
Maak eerst een niet deterministische versie en maak deze deterministisch voor string van a's en b's waarvoor geldt:

1. in de string komt de combinatie aba voor
2. in de string komt de combinatie aabaab voor

Maak ook een reguliere expressie beschrijving voor bovenstaande opgaven en test deze uit. Vergelijk in de simulator de resulterende eindige automaat met die je zelf bedacht had.

# Reguliere Expressies

1. maak een reguliere expressie voor de automaten van opgave 2.3
2. maak een reguliere expressie voor:

![Plaatje](./automaat/opg25c.svg)

Maak voor de volgende reguliere expressies (via een ND) een determinsitische eindige automaat:

```
1. (a|b)*ab(aa)*
2. (a|b)*(aa)*
3. (a(aab)*)*|(bb)*
```