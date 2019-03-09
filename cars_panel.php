<?
if($_POST['type_cost'] == "distance"){
    $jsonString = file_get_contents('cars.json');
    $jsonString = str_replace('<div>', '', $jsonString);
    $jsonString = str_replace('</div>', '', $jsonString);
    $jsonString = str_replace('<span>', '', $jsonString);
    $jsonString = str_replace('</span>', '', $jsonString);
    $jsonString = str_replace('<p>', '', $jsonString);
    $jsonString = str_replace('</p>', '', $jsonString);
    $jsonString = str_replace('<br>', ' ', $jsonString);
    $jsonString = str_replace('<br/>', ' ', $jsonString);
    $jsonString = str_replace('&#160;', '', $jsonString);
    $data = json_decode($jsonString, true);
    $index = 0;
    echo "<br>";
    foreach ($data as $key => $entry) {
        if($data[$key]['visible'] == "true"){
            echo '
            <div id="'.$key.'" class="button_carousel" onclick="select_car(\''.$key.'\')" style="">
                <img src="'.$data[$key]['icon'].'" id="button_item_carousel_after" onclick="" style="border-radius: 10px;" value="">
                <div type="button" id="button_item_carousel" onclick=""><b>'.$data[$key]['title'].'</b><br><b id="cost'.$index.'">От: '.$data[$key]['min_cost'].' р.</b></div>
                <i class="fa fa-info-circle info" id="" onclick="select_car(\''.$key.'\', \'1\')"></i>
            </div>
            ';
        }
        $index++;
    }
}
else if($_POST['type_cost'] == "time"){
    $jsonString = file_get_contents('cars.json');
    $jsonString = str_replace('<div>', '', $jsonString);
    $jsonString = str_replace('</div>', '', $jsonString);
    $jsonString = str_replace('<span>', '', $jsonString);
    $jsonString = str_replace('</span>', '', $jsonString);
    $jsonString = str_replace('<p>', '', $jsonString);
    $jsonString = str_replace('</p>', '', $jsonString);
    $jsonString = str_replace('<br>', '', $jsonString);
    $jsonString = str_replace('<br/>', '', $jsonString);
    $jsonString = str_replace('&#160;', '', $jsonString);
    $data = json_decode($jsonString, true);
    $index = 0;
    foreach ($data as $key => $entry) {
        if($data[$key]['visible'] == "true"){
            echo '
            <div id="'.$key.'" class="button_carousel" onclick="select_car(\''.$key.'\')" style="">
                <img src="'.$data[$key]['icon'].'" id="button_item_carousel_after" onclick="" style="border-radius: 10px;" value="">
                <div type="button" id="button_item_carousel" onclick=""><b>'.$data[$key]['title'].'</b><br><b id="cost'.$index.'">От: '.$data[$key]['arenda_min'].' р.</b></div>
                <i class="fa fa-info-circle info" id="" onclick="select_car(\''.$key.'\', \'1\')"></i>
            </div>
            ';
        }
        $index++;
    }
}




















?>