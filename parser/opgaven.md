# Opgaven Grammatica's

De opgaven zijn bedoeld om op papier gemaakt te worden. Je kan de rekenkundige expressies controleren met de simulator.

4.1 Geef ontleedbomen voor de volgende rekenkundige expressies:
```
(a) 3 - 1 + 2
(b) 6 + 4 * 5
(c) 5 * 6 + 3 * (4 - 2 * 3)
```

4.2 Gegeven is de volgende grammatica:
```
S = X | c S
X = a X? b
```
Geef ontleedbomen voor de volgende strings:
```
(a) c a a b b
(b) c c a a a b b b
(c) c c c c c c c a b
(d) wat is de taal van X ?
```

4.3 Gegeven is de volgende grammatica:
```
S = d X | c S
X = a X | Y
Y = (b Y)?
```
Geef ontleedbomen voor de volgende strings:
```
(a) c d a a
(b) c c d a a a b b b
(c) c c c c c c c d a b
(d) Geef een reguliere expressie en een eindige automaat voor de taal S. 
    De taal is dus wel regulier, hoe kan dat ondanks de recursie?
```

4.4 Stel voor de volgende talen grammatica’s op (a𝑛 betekent n a’s achter elkaar):
```
(a) { a𝑛 b𝑛 | n >= 0 }
(b) { a𝑛 b𝑚 | n >= 0 Λ m >= 0 Λ m <= n }
(c) { (a𝑛 b𝑛)* c* | n >= 0 }
```