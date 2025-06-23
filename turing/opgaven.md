# Opgaven Turing Machines

### Opgave 5.3 Turing machines maken (eenvoudig)
Algemeen: de invoer bestaat uit nullen, enen, spaties (```_```) en hulpsymbolen (mag je zelf kiezen). 
Rechts van de invoer is de tape gevuld met (oneindig veel) spaties (```_```).

1. Check of de invoer uit een even aantal symbolen bestaat.
2. Schuif de hele invoer 1 positie naar rechts en voeg een 0 toe aan het begin.
3. De invoer bestaat uit een ```0,1``` string afgesloten met een ```#```. Kopieer de hele string naar de tape
achter #. Bedenk een truc om te onthouden waar je gebleven bent!
4. Als b, maar kopieer gespiegeld.

### Opgave as, bs, cs
We hebben gezien dat het volgende niet mogelijk is met een Stapel Automaat: 
* {a<sup>i</sup>b<sup>j</sup>c<sup>k</sup> | i = k = j} Maak een Turing Machine die dit soort strings op de tape accepteerd.

### Opgave 6.2 Turing machines maken (moeilijker)
1. De invoer bestaat uit enen gevolgd door nullen. Accepteer als het aantal enen groter is dan het
aantal nullen.
2. De invoer is een  binair getal. Verlaag het getal met 1.
3. De invoer is een binair getal. Verhoog het getal met 1. Voeg eerst een 0 toe aan het begin (5.3.2) voor de overflow!


### Opgave 6.3 Turing machines maken (bonus)
1. De invoer is een binair getal. Verhoog het getal met 1. Schuif alleen naar rechts als dit nodig is!
2. De invoer bestaat uit een reeks enen (unair getal) afgesloten door een #. Na afloop staat in
binaire notatie het aantal enen rechts van het #. Maak hierbij gebruik van 1!
