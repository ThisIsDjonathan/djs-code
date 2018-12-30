
"""
A non-empty array A consisting of N integers is given. The array contains an odd number of elements, and each element of the array can be paired with another element that has the same value, except for one element that is left unpaired.

For example, in array A such that:

  A[0] = 9  A[1] = 3  A[2] = 9
  A[3] = 3  A[4] = 9  A[5] = 7
  A[6] = 9
the elements at indexes 0 and 2 have value 9,
the elements at indexes 1 and 3 have value 3,
the elements at indexes 4 and 6 have value 9,
the element at index 5 has value 7 and is unpaired.
"""

def solution(A):
  result = 0
  for number in A:
    # XOR 
    result ^= number
  return result
    
a1 = [1, 2, 3, 3, 2, 1, 7]
solution(a1)

aux = []
for i in range(100000):
  aux.append(i)
a2 = aux + aux + aux
a2.append(1001)
solution(a2)



