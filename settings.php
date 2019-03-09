<?php
if($_POST['enabled_cars']){
    //$json_words_car_enabled = substr($_POST['enabled_cars'],1,-1);
    //$json_words_car_enabled = explode(",", $json_words_car_enabled);

    /*$jsonString = file_get_contents('cars.json');
    $data = json_decode($jsonString, true);

    $index = 0;
    foreach ($data as $key => $entry) {
        $data[$key]['visible'] = $json_words_car_enabled[$index];
        $index++;
    }
    $newJsonString = json_encode($data);*/
    if($_POST['formatting']){
        file_put_contents('cars_html.json', $_POST['enabled_cars']);
    }
    else{
        file_put_contents('cars.json', $_POST['enabled_cars']);
    }
    echo "saved";
}












?>