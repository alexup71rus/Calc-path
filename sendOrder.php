<?
header('Content-type: text/html; charset=utf-8');
mb_internal_encoding("UTF-8");
//https://api.telegram.org/bot650872174:AAEfmOlcOK2YDQWzkg3EoPY9z1TH-mOxPtY/setwebhook?url=https://khodyr.ru/wordpress/wp-content/plugins/calc_path/sendOrder.php
$botToken = "650872174:AAEfmOlcOK2YDQWzkg3EoPY9z1TH-mOxPtY";
$api = "https://api.telegram.org/bot".$botToken;
$content = file_get_contents("php://input");
$update = json_decode($content, TRUE);
$message = $update["message"];
$text = $message["text"];
$chatId = $message["chat"]["id"];

switch($text){
    case '/start':
        sendMessage($chatId, $chatId);
        break;
    default:
        break;
}

if(!$text){
	if($_POST['to']){
		$message = "Новый заказ!%0AАдреса:%0A   Откуда: ".$_POST['from']."%0A   Куда: ".$_POST['to']."%0A%0AУслуга: ".$_POST['service']."%0AДополнительные улуги: ".$_POST['more_service']."%0AВремя поездки: ".$_POST['datatime']."%0AТариф: ".$_POST['tariff']."%0A";
		if($_POST['time_calc']){
			$message .= "   Время аренды: ".$_POST['time_calc']."%0A";
		}
		if($_POST['from_to']){
			$message .= "   ".$_POST['from_to']."%0A";
		}
		$message .= "Пожелания: ".$_POST['wishes']."%0A Цена: ".$_POST['price']."%0AПредоплата: ".($_POST['price']/100*20)."%0AЦена клиента: ".$_POST['customPrice']."%0A   Номер: ".$_POST['num']."";
		
		if (isset($_SERVER['HTTPS']))
			$scheme = $_SERVER['HTTPS'];
		else
			$scheme = '';
		if (($scheme) && ($scheme != 'off')) $scheme = 'https';
		else $scheme = 'http';
		if($scheme == "https"){
			sendMessage($chatId, $message);
		}
	}

	function sendMessage($chat_id, $message) {
		if(file_get_contents($GLOBALS['api'] . '/sendMessage?chat_id=296193241&text=' . $message ));
		if(file_get_contents($GLOBALS['api'] . '/sendMessage?chat_id=585239107&text=' . $message));
		//if(file_get_contents($GLOBALS['api'] . '/sendMessage?chat_id=' . $chat_id . '&text=' . $message . '&reply_markup=' . $replyMarkup));
	}


	$to = "mminibus@bk.ru, alexup71rus@gmail.com";
	//$to = "alexup71rus@gmail.com";
	$subject = "!!!";
	$subject = '=?utf-8?B?'.base64_encode(convert_cyr_string($subject, "i","k")).'?=';
	$messagehtml = "
	<html xmlns='http://www.w3.org/1999/xhtml'>
	<head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head>
	<body>
	<b>Новый заказ!</b><br>
	<b>Адреса:</b><br>
	Откуда: ".$_POST['from']."<br>
	Куда: ".$_POST['to']."<br><br>
	<b>Услуга: </b>".$_POST['service']."<br>
	<b>Дополнительные улуги: </b>".$_POST['more_service']."<br>
	<b>Время поездки: </b>".$_POST['datatime']."<br>
	<b>Тариф: </b>".$_POST['tariff']."<br>";
	if($_POST['time_calc']){
		$messagehtml .= "<b>ВРЕМЯ АРЕНДЫ: </b>".$_POST['time_calc']."<br>";
	}
	if($_POST['from_to']){
		$messagehtml .= "".$_POST['from_to']."<br>";
	}
	$messagehtml .= "<b>Пожелания: </b>".$_POST['wishes']."<br>
	<b>Цена: </b>".$_POST['price']."<br>
	<b>Предоплата: </b>".($_POST['price']/100*20)."<br>
	<b>Цена клиента: </b>".$_POST['customPrice']."<br>
	<b>Номер: </b>".$_POST['num']."<br>
	</body>
	</html>";
	$headers  = "Content-type: text/html";
	echo $messagehtml;
	mail($to, $subject, $messagehtml, "Content-Type: text/html; charset=utf-8");
}
?>