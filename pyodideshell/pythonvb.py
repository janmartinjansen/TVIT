def find(x,xs):
    for a in xs:
        if x == a:
            return True
    return False

def findW(x,xs):
    i = 0
    while i < len(xs):
        if xs[i] == x:
            return True
        else:
            i = i+1
    return False

def findWR(i,x,xs):
    if i == len(xs):
        return False
    elif x == xs[i]:
        return True
    else:
        return findWR(i+1,x,xs)
    
def findR(x,xs):
    if len(xs) == 0:
        return False
    else:
        a,*rs = xs
        if x == a:
            return True
        else:
            return findR(x,rs)
        
def index(x,xs):
    for i in range(len(xs)):
        if x == xs[i]:
            return i
    return -1

def indexR(i,x,xs):
    if len(xs) == 0:
        return -1
    else:
        a,*rs = xs
        if x == a:
            return i
        else:
            return indexR(i+1,x,rs)
 


a = [1,2,3,4,5,6,7]
print(find(3,a))
print(findW(3,a))
print(findWR(0,3,a))
print(findR(3,a))
print(indexR(0,5,a))
