# Eindige Automaten

Je kunt eenvoudig een beschrijving van een eindige automaat invoeren:

```
1 a 1
1 b 2
2 b 2
start 1
end 1 2

tape abbb
tape bbbb
tape
tape ba
```
![Plaatje](./automaat/vb1.svg)

Een regel bestaat uit ```state1 symbool state2```. Je moet een start state en minimaal 1 end state opgeven.
Verder moet je een aantal voorbeeld tape (invoerstring) beschrijvingen geven (in dit geval zit er ook een lege invoerstring bij).

Onder de Run knop zie je een plaatje van de automaat en kan je de verschillende invoer stringen testen.
Er is ook een step modus.

Als je iets wijzigt in de code, dan wordt de nieuwe code automatisch opgeslagen onder een datum-tijd combinatie.
Je kan de naam wijzigen of het voorbeeld weggooien.

Het opslaan van de code gebeurt lokaal in de browser en dus niet online! Als je op dezelfde computer en met dezelfde browser de App opnieuw opent, dan zie je opgeslagen code weer terug.