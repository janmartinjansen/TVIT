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
