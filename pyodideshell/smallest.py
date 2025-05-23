def smallest_loop(a):
  s = a[0]
  n = len(a)
  k = 1
  while k < n:
    if a[k] < s:
      s = a[k]
      k + 1
  return s

def smallest_rec(a,s,k):
  if k == len(a):
    return s
  elif a[k] < s:
    return smallest_rec(a,a[k],k+1)
  else:
    return smallest_rec(a,s,k+1)