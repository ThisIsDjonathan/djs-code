
"""
An array A consisting of N integers is given. Rotation of the array means that each element is shifted right by one index, and the last element of the array is moved to the first place. For example, the rotation of array A = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7] (elements are shifted right by one index and 6 is moved to the first place).

The goal is to rotate array A K times; that is, each element of A will be shifted to the right K times.

For example, given:
    A = [3, 8, 9, 7, 6]
    K = 3
    Return = [9, 7, 6, 3, 8]
"""

def solution(A, K):
  tmp = []
  i = 0
  
  if len(A) == 0:
    return tmp
  if K == 0:
    return A

  while (i < K):
    last = A[-1]
    tmp = A[0:-1]
    tmp.insert(0, last)
    i = i + 1
    A = tmp
  return tmp

A = [3, 8, 9, 7, 6]
s = solution(A, 1)
print(str('Result: ' + str(A) + ' -> ' + str(s)))

A = [1, 2, 3, 4]
s = solution(A, 4)
print(str('Result: ' + str(A) + ' -> ' + str(s)))
