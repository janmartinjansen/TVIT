# Gebruik Reguliere Expressies

Reguliere expressies zijn vooral nuttig in compilers (vertalers) van programmeertalen.
Ze worden gebruikt om de afzonderlijke keywords, tekens en getallen te herkennen. 
We noemen dit ook wel tokens:

```python
def fac(n):
  res = 1 
  for i in range(1,n):
    res = res * i
  return res
  ```
Tokens: def, fac, (, n, ), :, res, =, 1, etc

Vaste namen zoals ```def```, ```for``` en ```result``` zijn natuurlijk makkelijk te herkennen.

Getallen en namen zijn al wat ingewikkelder.
Het is dan handig om de reguliere expressie op te hakken in delen en deze aparte namen te geven.
Gehele getallen kunnen we op deze manier beschrijven (let op: een getal mag niet met 0 beginnen, tenzij het 0 is):

```
nzdigit = 1|2|3|4|5|6|7|8|9
digit   = 0|nzdigit
number  = 0|nzdigit digit*
```

In de voorbeelden beperken we ons even tot binaire getallen (geheel en floating):

```
0|1(0|1)*

(0|1(0|1)*)[.(0|(0|1)*1)]
```

