def subsets(k,xs):
  if k == len(xs):
    return [[]]
  else:
    h = xs[k]
    ss = subsets(k+1,xs)
    return ss + [[h] + s for s in ss]
  
print(subsets(0,[1,2,3,4]))