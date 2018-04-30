'''
    Programa simples que gera uma matriz retangular com numeros
    aleatorios.

    Djonathan Krause - 2015
'''

#imports
import sys
from random import randint

#declaração das listas
m = []
n = []

#declaração dos contadores
i = 0
i2 = 0


while(i <= 10):
    while(i2 <= 5):
        #lista n recebe um valor random
        n.append(randint(0, 10000))
        i2 += 1
    #lista m recebe a lista n
    m.append(n)
    i += 1
    #limpa lista n
    n = []
    i2 = 0


#printa a matriz de um jeito bonitinho(sabe-se la como)
print('\n'.join([''.join(['{:5}'.format(item) for item in row]) 
      for row in m]))



