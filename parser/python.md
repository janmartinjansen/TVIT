# Grammatica's en Parsen

Hier de grammatica voor een versimpelde versie van een Python functie, met een aantal voorbeelden.
De voorbeelden zijn gescheiden met ----

De grammatica ziet er er misschien imponerend uit door het aantal regels, maar is eigenlijk niet erg complex. 
Er zijn gewoon veel constructies in Python. Een volledige grammatica voor Python is nog veel langer.

Iha zijn programmeertalen zo gemaakt dat ze redelijk eenvoudig met een grammatica zijn te beschrijven.
Sterker nog, bij het bedenken van een nieuwe taal is de grammatica van de taal altijd het uitgangspunt.
Er bestaat heel veel tooling die vanuit een grammatica een programma genereert die de bijbehorende taal kan inlezen en
omzet naar een boomachtige structuur, zoals wij dat ook doen.
De boomachtige structuur (syntax tree) is het uitgangspunt voor verdere verwerking van de taal.
We zullen hier later nog voorbeelden van zien. 

De eerste regel bepaalt wat er wordt herkend. In dit geval is dat dus een ```function```.
Wil je experimenteren met kleinere delen van Python, zorg dan dat je de bijbehorende regel bovenaan zet:

```
statement   -> complexstat | simplestat newline
# overige regels
```
Voor als je statements wilt testen.