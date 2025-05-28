# Niet deterministische Automaten

Een eindige automaat noemen we niet deterministisch als er twee of meer overgangen vanuit eenzelfde toestand zijn met hetzelfde symbool.
Voor veel problemen is het makkelijker eerst een niet deterministische automaat te maken en deze daarna deterministisch te maken.
Het volgende voorbeeld beschrijft invoerstrings waarin de combinatie ab voorkomt. 
Intuitief is dit eenvoudig te beschrijven als: eerst een willekeurig aantal a's en b's, daarna gevold door ab, gevolgd door weer willekeurige a's en b's. De volgende automaat beschrijft dit precies:

![Plaatje](./automaat/nd_ab.svg)

De automaat is niet deterministisch omdat er in toestand 1 2 uitgaande pijlen met een a zijn.
De simulator herkent niet determistische automaten en zet ze om naar een deterministische automaat met het algoritme dat we behandeld hebben.

![Plaatje](./automaat/da_ab.svg)

Het resultaat is iets ingewikkelder dan noodzakelijk is. De laatste toestand is eigenlijk niet nodig. De pijl met a had ook weer naar 13 mogen gaan. Maar de automaat is wel correct en deterministsch!