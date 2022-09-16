<?php 
    include("BubbleSort.php");

    $numbers = [0,2,4,7,3,5,9,8,6,1];
    $sorter = new BubbleSort();
    $sorted_numbers = $sorter->sort($numbers);

    echo "\nSource list:\n";
    print_r($numbers);
    
    echo "\nSorted list:\n";
    print_r($sorted_numbers);
