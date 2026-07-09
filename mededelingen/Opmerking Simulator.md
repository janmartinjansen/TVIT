# Opmerking Simulator
In de simulator zijn er om te vergelijken alleen maar iflt (getal kleiner dan 0) en ifeq (getal gelijk aan 0).
Maar hoe doe je dan a < b, a <= b en a <> b (a en b ongelijk)?

Bedenk dan dat a < b hetzelfde is als a - b < 0 en dat a <= b de ontkenning (tegengestelde) is van a > b (wat weer b < a is).

Op dezelfde manier is a <> b de ontkenning van a == b.

Zo zie je dat je alle vergelijkingen kunt terugvoeren op de basis 2 vergelijkingen iflt en ifeq.