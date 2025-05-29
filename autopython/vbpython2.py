# even aantal a
# vb2('aaaa')

def vb2(inp):
    state = 1
    end = [1]
    for c in inp:
        if state == 1:
            if c == 'a':
                state = 2
            else:
                return False
        elif state == 2:
            if c == 'a':
                state = 1
            else:
                return False
    return state in end

print(vb2('aaaa'))