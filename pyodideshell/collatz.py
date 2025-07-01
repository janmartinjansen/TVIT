def collatz(n):
  while n > 1:
    if n % 2 == 0:  # n even
      n = n /2 
    else:
      n = 3*n + 1
  return True

print(collatz(147454546))