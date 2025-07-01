# IJVM instructie overzicht
| instructie | beschrijving |
|:--|:--|
| bipush const | zet constante op stack |
| goto offset | zet pc op pc + offset |
| iadd | tel bovenste 2 elementen van stack op en zet resultaat op stack|
|isub| trek bovenste 2 elementen van stack af en zet resultaat op stack|
|imult |vermenigvuldig bovenste 2 elementen van stack en zet resultaat op stack|
|idiv| deel bovenste 2 elementen van stack en zet resultaat op stack|
|iand| boolean and bovenste 2 elementen van stack en zet resultaat op stack|
|ior| boolean or bovenste 2 elementen van stack en zet resultaat op stack|
|iinc vn const| verhoog variabele met offset vn tov LV met const |
|iload vn| laad variable met offset vn tov LV op stack|
|istore vn| pop waarde van stack en zet dit in variabele met offset vn tov LV|
|dup |dupliceer top van stack|
|pop| pop waarde van stack|
|swap| verwissel bovenste 2 elementen stack|
|iflt offset| pop bovenste waarde stack, als < 0 ga verder bij pc + offset|
|ifeq offset| pop bovenste waarde stack, als = 0 ga verder bij pc + offset|
|if_compeq offset| pop bovenste 2 waarden stack, als gelijk ga verder bij pc + offset|
|call nrargs nrlv npc| roep functie aan|
|ireturn| return uit functie|

