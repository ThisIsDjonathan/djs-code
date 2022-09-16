
"""
    About the merge sort algorithm: https://en.wikipedia.org/wiki/Merge_sort
"""
def merge_sort(numbers_to_sort):
    if len(numbers_to_sort) <= 1:
        return 
    
    middle_index = len(numbers_to_sort) // 2 # // will floor the result
    left_list = numbers_to_sort[:middle_index]
    right_list = numbers_to_sort[middle_index:]

    # recursion will call itself until the array has only 1 element
    merge_sort(left_list)
    merge_sort(right_list)

    # merging and sorting 
    left_list_index = 0
    right_list_index = 0
    merged_list_index = 0
    sorted_numbers = numbers_to_sort
    
    while left_list_index < len(left_list) and right_list_index < len(right_list):
        actual_number_from_left_list = left_list[left_list_index]
        actual_number_from_right_list = right_list[right_list_index]

        if actual_number_from_left_list < actual_number_from_right_list:
            sorted_numbers[merged_list_index] = actual_number_from_left_list
            left_list_index += 1
        else:
            sorted_numbers[merged_list_index] = actual_number_from_right_list
            right_list_index += 1

        merged_list_index += 1

    # append the numbers that were not merged to the end of the sorted list
    while left_list_index <= len(left_list)-1:
        sorted_numbers[merged_list_index] = left_list[left_list_index]
        left_list_index += 1
        merged_list_index += 1

    while right_list_index <= len(right_list)-1:
        sorted_numbers[merged_list_index] = right_list[right_list_index]
        right_list_index += 1
        merged_list_index += 1

    return sorted_numbers
