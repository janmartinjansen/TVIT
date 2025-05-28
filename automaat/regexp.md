# Reguliere Expressies

Reuguliere expressies zijn een alternatieve manier om invoerstringen te beschrijven.
We hebben al gezien dat ze equivalent zijn met eindige automaten.

```a*``` nul of meer keer a

```a+``` één of meer keer a

```[a]``` optioneel a

```a|b``` a of b

Op de plaats van a en b mogen weer andere reguliere expressies staan (eventueel tuusen haakjes).
Let erop dat een + of * alleen op het laatste symbool ervoor slaan (gebruik dus eventueel haakjes).  Voor | geldt precies het omgekeerde op alles slaat wat er voor en achter staat. Daar zijn haakjes 

Voorbeelden:

```
ab|ca de string ab of ba
a(b|c)a de string aba of aca
(a|b)* strings van willekeurig a's en b's
a[.b] a gevolgd door optioneel .b

```


