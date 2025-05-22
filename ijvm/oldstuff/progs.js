//prognames = ['kwadraat','sum recursief,'sum loop', 'ggd','fib','vb']

progs = [
`    bipush 6
    call 1 0 33
    print
    stop
33	iload 0
    dup
    imult
    ireturn
`,
`    bipush 10
    call 1 0 1
    printstack
    print
    stop
1   printstack
    iload 0
    ifeq 2
    iload 0
    dup
    bipush 1
    isub
    call 1 0 1
    iadd
    printstack
    ireturn
2   bipush 0
    ireturn
`,
`  bipush 10
  call 1 1 1
  print
  stop
1 bipush 0
  istore 1
2 printstack
  iload 0
  ifeq 3
  iload 1
  iload 0
  iadd
  istore 1
  iload 0
  bipush 1
  isub
  istore 0
  goto 2
3 iload 1
  ireturn
`,
`  bipush 27
  bipush 15
  call 2 0 1
  print
  stop
1 iload 0
  ifeq 2
  iload 1
  ifeq 3
  iload 1
  iload 0
  isub
  iflt 4
  iload 0
  iload 1
  iload 0
  isub
  call 2 0 1
  ireturn
2 iload 1
  ireturn
3 iload 0
  ireturn
4 iload 0
  iload 1
  isub
  iload 1
  call 2 0 1
  ireturn
`,
`  bipush 10
  call 1 0 1
  print
  stop
1 iload 0
  bipush 2
  isub
  iflt 2
  iload 0
  bipush 1
  isub
  call 1 0 1
  iload 0
  bipush 2
  isub
  call 1 0 1
  iadd
  ireturn
2 bipush 1
  ireturn
`,
`  bipush 7
  bipush 8
  bipush 4
  iadd
  imult
  print
`,
`   bipush 3
   bipush 1
   bipush 2
   bipush 3
   call 4 0 33
   pop
   stop
33 iload 0
   ifeq 44
   iload 0
   bipush 1
   isub
   iload 1
   iload 3
   iload 2
   call 4 0 33
   pop
   iload 1
   print
   iload 2
   print
   iload 0
   bipush 1
   isub
   iload 3
   iload 2
   iload 1
   call 4 0 33
   pop
   bipush 77
   ireturn
44 bipush 66
   ireturn
`,
`    call 0 2 5
	pop
	stop
5	bipush 5
	new
	istore 0
	bipush 5
	istore 1
	bipush 6
	bipush 0
	iload 0
	iastore
	bipush 9
	bipush 1
	iload 0
	iastore
	bipush 3
	bipush 2
	iload 0
	iastore
	bipush 7
	bipush 3
	iload 0
	iastore
	bipush 2
	bipush 4
	iload 0
	iastore
    iload 0
	printmem
	iload 0
	iload 1
	call 2 4 10
	printmem
	bipush 77
	ireturn
10  bipush 0
	istore 2
20	iload 2
    iload 1
    isub
	ifeq 50
	iload 2
	istore 4
	iload 2
	bipush 1
	iadd
	istore 3
30	iload 3
	iload 1
	isub
	ifeq 40
	iload 0
	iload 3
	iaload
	iload 0
	iload 4
	iaload
	isub
	iflt 45
	goto 47
45  iload 3
    istore 4
47  iinc 3 1
    goto 30
40	iload 0
    iload 2
	iaload
	istore 5
	iload 0
	iload 4
	iaload
	iload 0
	iload 2
	iastore
	iload 5
	iload 0
	iload 4
	iastore
	iinc 2 1
	goto 20
50  iload 0
    ireturn
`
]
