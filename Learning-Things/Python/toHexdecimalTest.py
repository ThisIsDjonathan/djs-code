#x = '64218'
x = '47802'
div = 0
mod = ''
mod2 = ''
result = ''

for i in range(len(x))
    div = int(x)  16
    mod = (int(x) % 16)
    mod2 += str(mod)
    x = div
    
    if mod == 1
        result += '1'  
    if mod == 2
        result += '2'
    if mod == 3
        result += '3'
    if mod == 4
        result += '4'
    if mod == 5
        result += '5'
    if mod == 6
        result += '6'
    if mod == 7
        result += '7'
    if mod == 8
        result += '8'
    if mod == 9
        result += '9'
    elif mod == 10
        result += 'A'
    elif mod == 11 
        result += 'B'
    elif mod == 12
        result += 'C'
    elif mod == 13 
        result += 'D'
    elif mod == 14
        result += 'E'
    elif mod == 15 
        result += 'F'

#print(mod2)
result = result[-1]
print(result)

