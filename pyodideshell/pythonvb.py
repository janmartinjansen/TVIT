import math

def isPrime(n):
    wn = math.sqrt(n)
    wn = math.trunc(wn)
    for k in range(2,wn+1):
        if n % k == 0:
            return False
    return True

def goldbach_bounded(b):
    # every even number is the sum of 2 primes
    # program
    n = 4
    while n < b:
        if not isSum2Primes(n):
            return False
        n += 2
    return True

def goldbach():
    # every even number is the sum of 2 primes
    # program
    n = 4
    while True:
        if not isSum2Primes(n):
            return False
        n += 2
    return True

def isSum2Primes(n):
    for k in range(2,n//2+1):
        if isPrime(k) and isPrime(n-k):
            return True
    return False
print(goldbach_bounded(10000))

def som(n):
  if n == 0: 
    return 0;
  else:
    return n + som(n-1)
