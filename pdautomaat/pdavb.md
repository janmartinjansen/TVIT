# Push Down automaten
Kunnen we de definitie van een eindige automaat zo aanpassen, zodat deze ook invoer stringen zoals een aantal a's gevolgd door net zoveel b's kan herkennen?

Dit kan mbv zgn Pushdown automaten (ook wel stack of stapel automaten)

### Stack (stapel)

Alleen bovenste element is zichtbaar. Je kunt aan de bovenkant toevoegen en verwijderen.
```
s -/- lees s op de invoer (er gebeurt niets met de stack)
s a/- lees s op de invoer, herken a op stack en verwijder
s -/a lees s op de invoer, plaats a op stack
s a/b lees s op de invoer, herken a op stack en vervang door b

Alle stack varianten zijn ook mogelijk met epsilon overgang, bv:

- -/a plaats a op stack (lees geen invoer)
- a/- herken a op stack en verwijder
- a/b herken a op stack en vervang door b
```
Een stapel automaat accepteert een invoerstring als deze helemaal wordt herkend en de stack op het eind leeg is.

Ons voorbeeld: een aantal a's gevolgt door net zoveel b's wordt nu: 

```
0 a -/a 0
0 b a/- 1
1 b a/- 1
start 0
end 1
```

![Plaatje](./pdautomaat/vb1.svg)

Het basis idee is simpel! Voor iedere a die je herkent zet je een a op de stack. Voor iedere b die je ziet verwijder je een a van de stack.
Als de aantallen gelijk zijn eindig je precies met een lege stack!

Vraag: accepteert deze pd-automaat ook de lege string (welke aanpassing is er evt nodig)?
