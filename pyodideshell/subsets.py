def subsets(xs):
  if xs == []:
    return [[]]
  else:
    h, *ts = xs
    ss = subsets(ts)
    return [[h] + s for s in ss] + ss
  
print(subsets([1,2,3,4]))