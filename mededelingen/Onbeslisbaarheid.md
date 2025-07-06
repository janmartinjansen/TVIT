# Onbeslisbaarheid
Een probleem heet onbeslisbaar als daarvoor geen procedure valt te maken/programmeren die het probleem in eindig veel stappen oplost. Het Halting probleem is het belangrijkste voorbeeld. Het is niet mogelijk om een algemene procedure te bedenken die voor een willekeurig algoritme met invoer kan zeggen of de uitvoer van het algoritme zal eindigen.

Een essentieel onderdeel van het bewijs van de onmogelijkheid van de Halt functie, is het feit dat je in ieder Turing volledig formalisme, het formalisme kunt gebruiken om de executie van het formalisme zelf te beschrijven. Meer concreet: je kan in Python een Python-interpreter schrijven. Dit stelt ons in staat om de paradoxale functie te maken, die naar zichzelf verwijst. Ieder formalisme met deze eigenschap heeft de mogelijkheid tot het maken van paradoxen.

Het is heel belangrijk onderscheid te maken tussen onopgeloste problemen en onbeslisbare problemen! Het Collatz probleem is nog niet opgelost, maar dat maakt het niet per definitie onbeslisbaar. Er kan op ieder moment, of een startgetal gevonden worden waarmee het algoritme in een loop gaat die niet bij 1 eindigt, of een bewijs gevonden worden dat het in alle gevallen moet eindigen. Maar er is ook nog een (misschien kleine) kans dat het probleem toch onbeslisbaar is, zoals Hilberts tiende probleem. Hiervoor zou je moeten aantonen dat een oplossing voor het Collatz probleem ook een oplossing voor het Halting probleem impliceert.

Een ander voorbeeld van een onbeslisbaar probleem is:
* de equivalentie van algoritmen: geven 2 verschillende algoritmen bij dezelfde input altijd hetzelfde antwoord? Dit is i.h.a niet te bewijzen (dus soms wel in bijzondere gevallen)


