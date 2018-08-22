

#imports
import sys
from random import randint

#declaração das listas
m = []
n = []

#declaração dos contadores
i = 0
i2 = 0

#numero X de colunas da tabela 
irr = randint(5, 15)

while(i <= irr):
    irr = randint(5, 15)
    while(i2 <= irr):
        #lista n recebe um valor random
        n.append(randint(0, 10000))
        i2 += 1
    #lista m recebe a lista n
    m.append(n)
    i += 1
    #limpa lista n
    n = []
    i2 = 0


#printa a matriz 
print('\n'.join([''.join(['{:5}'.format(item) for item in row]) 
      for row in m]))



