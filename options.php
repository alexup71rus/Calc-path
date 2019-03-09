<?

$json_words_car_enabled = substr($_POST['enabled_cars'],0,-1);
$json_words_car_enabled = explode(",", $json_words_car_enabled);
echo $json_words_car_enabled[1];




















?>