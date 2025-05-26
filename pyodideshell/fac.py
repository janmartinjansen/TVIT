def facloop(n):
  res = 1
  k = 1
  while k <= n:
    res = res * k
    k = k + 1
  return res

def facrec(n):
  if n == 0:
    return 1
  else:
    return n * facrec(n - 1)
  
print(facloop(6))
print(facrec(6))