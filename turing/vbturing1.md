# Turing Machines 
De Turing machine is een logische uitbreiding van de Eindige (en Stapel) automaat.
Er is alleen geen aparte stack en er kan nu ook op de invoer tape geschreven worden.


* Eindige automaat met een tape met symbolen waarop gelezen en geschreven kan worden
* Leeskop die op bepaalde positie van tape staat
* In iedere state wordt de volgende state bepaald door de combinatie van de state en de waarde onder de leeskop
* Er kan een ander symbool op de plek van de leeskop worden geschreven
* De leeskop gaat een positie naar links of rechts
* Er zijn speciale eindtoestanden (states) waar de berekening stopt
  * Kan een Accept of Reject state zijn
  * Vaak is de inhoud van tape na afloop het antwoord
* Vaak ontbreken de Reject states en is de Reject impliciet als er geen regel toegepast kan worden (zoals eerder)

Een regel voor een Turing machine heeft dus de volgende structuur:

```
s1 r w d s2
```
* s1 is de huidige state
* r het symbool dat herkend moet worden 
* w het symbool dat geschreven wordt 
* d de richting waarna de leeskop zicht verplaats: L of R (links of rechts)
* s2 is de nieuwe state

Een spatie (blank) noteren we met ``` _ ``` voor de leesbaarheid! De tape is aan de rechterkant oneindig lang (wordt steeds aangevuld met een ```_```).

In het voorbeeld staan er op de invoertape nullen en enen gescheiden door het symbool #.
De Turing machine moet controleren of er voor en achter # dezelfde string staat.
Initieel staat de leeskop op het meest linkse symbool.

In het algoritme wordt, van links naar rechts, steeds een symbool voor en na # gecontroleerd en daarbij vervangen door een x 
(om te onthouden waar je gebleven bent). Met de step functie kan je goed zien wat er gebeurt.