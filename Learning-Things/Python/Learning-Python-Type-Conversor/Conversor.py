'''
  Métodos para conversão de números para binário, decimal e hexadecimal

  Djonathan Krause - 2015
'''

#Os números para conversão são setados na linha 105!
class toBin():

    def inverte(self, numero):
        numero = numero[::-1]
        return numero
  
    def calc(self, numero):
        result = 0
        bits = [1, 2, 4, 8, 16, 32]
    
        for i in range(len(numero)):
            if (numero[i] == '1'):
                result += bits[i]
        return result

    def printa(self, n):
        print('O numero ', n, ' em decimal eh: ', self.calc(self.inverte(n)))



class toDec():

    def calc(self, x):
        y = x
        bin = ''

        while(x >= 1): 
            resto = x % 2
            div = x / 2
            bin += str(resto)
            x = int(div)
        bin = bin[::-1]
        return bin
    
    def printa(self, n):
        print('O numero ', n, ' em binario eh: ', self.calc(n))


class toHex():

    def printa(self, x):
        print('O numero', x, ' em hexadecimal eh:', self.calc(x))


    def calc(self, x):    
        div = 0
        mod = ''
        mod2 = ''
        result = ''

        for i in range(len(x)):
            div = int(x) / 16
            mod = (int(x) % 16)
            mod2 += str(mod)
            x = div
            
            if mod == 1:
                result += '1'  
            if mod == 2:
                result += '2'
            if mod == 3:
                result += '3'
            if mod == 4:
                result += '4'
            if mod == 5:
               result += '5'
            if mod == 6:
                result += '6'
            if mod == 7:
                result += '7'
            if mod == 8:
                 result += '8'
            if mod == 9:
                result += '9'
            elif mod == 10:
                result += 'A'
            elif mod == 11:
                result += 'B'
            elif mod == 12:
                result += 'C'
            elif mod == 13:
                result += 'D'
            elif mod == 14:
                result += 'E'
            elif mod == 15:
                result += 'F'

        result = result[::-1]
        return result
        


b = toBin()
d = toDec()
h = toHex()

#Conversão dos números: 
b.printa('101010')
d.printa(42)
h.printa('47802')

