# aantal a's gevolgd door precies 1 b
# vb1('aaaaab')

def vb1(inp):
    state = 1
    end = [2]
    for c in inp:
        if state == 1:
            if c == 'a':
                state = 1
            elif c == 'b':
                state = 2
            else:
                return False
        elif state == 2:
            return False
    return state in end


print(vb1('aaaaab'))