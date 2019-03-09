<?
header('Content-type: text/html; charset=utf-8');
mb_internal_encoding("UTF-8");

$jsonString = json_encode(file_get_contents('cars.json'));

$jsonString = str_replace('<div>', '', $jsonString);
$jsonString = str_replace('</div>', '', $jsonString);
$jsonString = str_replace('<span>', '', $jsonString);
$jsonString = str_replace('</span>', '', $jsonString);
$jsonString = str_replace('<p>', '', $jsonString);
$jsonString = str_replace('</p>', '', $jsonString);
$jsonString = str_replace('<br>', ' ', $jsonString);
$jsonString = str_replace('<br/>', ' ', $jsonString);
$jsonString = str_replace('&#160;', '', $jsonString);
$jsonString = str_replace('\r', '', $jsonString);
$jsonString = str_replace('\n', '', $jsonString);
$jsonString = str_replace(' ', ' ', $jsonString);
$jsonString = str_replace(',', ', ', $jsonString);
$jsonString = strip_tags($jsonString);

echo json_decode($jsonString);










?>