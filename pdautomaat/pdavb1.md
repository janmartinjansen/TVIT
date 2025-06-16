# Tweede voorbeeld 
Strings met net zoveel a's als b's.

Dit lijkt op het eerste gezicht ingewikkelder dan het vorige voorbeeld, maar dat is niet zo!

a's en b's  kunnen nu in willekeurige volgorde voorkomen. We moeten ze tegen elkaar wegstrepen.
Analyseer de automaar goed en probeer te begrijgen wat er gebeurt.

```
start 1
end 1

1 a b/- 1
1 a -/a 1
1 b a/- 1
1 b -/b 1
```

![Plaatje](./pdautomaat/pdvb1.svg)
