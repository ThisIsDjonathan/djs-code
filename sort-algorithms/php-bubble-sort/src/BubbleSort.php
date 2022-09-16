<?php 

/**
 * This is a simple implementation of bubble sort algorithm.
 * About Bubble Sort: https://pt.wikipedia.org/wiki/Bubble_sort
 */
class BubbleSort {

    function sort(array $numbers_to_sort) {
        for ($i = 0; $i < sizeof($numbers_to_sort); $i++) {

            for ($j = 0; $j < sizeof($numbers_to_sort)-1; $j++) {
                $actual_number = $numbers_to_sort[$j];
                $next_number = $numbers_to_sort[$j+1];
                
                if ($actual_number >$next_number) {
                    $this->swap($numbers_to_sort, $j);
                }
            }
        }

        return $numbers_to_sort;
    }

    function swap(array &$numbers_list, int $index) {
        $aux = $numbers_list[$index];
        $numbers_list[$index] = $numbers_list[$index+1];
        $numbers_list[$index+1] = $aux;
    }

}
