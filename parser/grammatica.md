# Grammatica's

Eindige automaten en reguliere expressies zijn equivalent, ze beschrijven dezelfde talen.

Is er ook een equivalent van een stapel automaat?

Dit zijn de contextvrije grammatica's. Dit zijn in feite recursieve reguliere expressies.
De notatie is wel iets aangepast: optioneel doen we door ergens een vraagteken achter te zetten ipv tussen [ ].
De naam van een regel noemen we een non-terminal, iets dat herkent moet worden een terminal. 
Let op: in reguliere expressies herkenden we altijd losse letters (ook als ze aan elkaar stonden), 
hier herkennen we complete woorden (letters aan elkaar als groep).
In de voorbeelden moeten er dus spaties tussen de afzonderlijk te herkennen delen staan.
De afspraak is dat we non-terminals altijd met hoofdletters aangeven. 

Ons voorbeeld van a's gevolgd door net zo veel b's (wel minimaal 1 van beide) kunnen we dan als volgt beschrijven:

```
S ->  a S? b

----

a a b b

````
Let op: Tussen de grammatica en het voorbeeld komen nu 4 - (----). Meerdere voorbeelden scheiden met ----.
