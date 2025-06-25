# Turing Machines en Algoritmen
Iedere mogelijke berekening (algoritme) kan, in principe, gedaan worden met een Turing machine. 
We hebben dit niet formeel bewezen, maar wel aannemelijk gemaakt met een aantal voorbeelden.
Dit betekent ook dat ieder formalisme (programmeertaal) waarin je een Turing machine kunt uitdrukken ook geschikt is om ieder berekenbaar probleem mee op te lossen. Zo’n formalisme noemen we Turing volledig (complete). 

De equivalentie van formalismen toon je iha aan door ze in elkaars formalisme uit te drukken. Voor programmeertalen kan je dat doen door interpreters te maken voor elkaar. Iedere programmeertaal waarmee je een Turing machine kunt simuleren heeft dus dezelfde mogelijkheden om problemen op te lossen. Dit geldt ook voor computers. Ook deze kun je simuleren in een programmeertaal.

Waarom zijn er dan verschillende programmeertalen en computers? Voor computers zit dat in de snelheid waarmee ze problemen kunnen oplossen en de grootte van problemen die ze aankunnen.
Voor programmeertalen zit dat in het gemak waarmee je daarin bepaalde soort problemen kunt oplossen. 

In het bijzonder geldt voor ieder Turing volledig formalisme dat we daarin een executie omgeving (interpreter) voor het formalisme zelf kunnen maken. Dit is een buitengewoon krachtige eigenschap. Het vormt ook de basis voor het bewijs van het **Halting** probleem.

Er bestaan buitengewoon compacte formalismen die al Turing volledig zijn. 
We kwamen de kleinste universele Turing machine al tegen die slechts 2 toestanden, 3 symbolen en 6 overgangen kent. In principe is er dus voor ieder berekenbaar probleem een tape input te verzinnen, die uitgevoerd met deze TM een oplossing oplevert. Het coderen van het probleem en het decoderen van het antwoord zal echter niet eenvoudig zijn!

Het is dus niet mogelijk om een computer te maken die berekeningen kan doen die met een Turing machine onmogelijk zijn. Nieuwe ontwikkelingen zoals quantum computers gaan alleen over de snelheid waarmee problemen kunnen worden opgelost!


  


