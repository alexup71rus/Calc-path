<?


?>
<link rel="stylesheet" type="text/css" href="../wp-content/plugins/calc_path/css/main.css" >
<style>body{overflow: hidden;}::-webkit-scrollbar{width: 5px;}</style>
<script src="../wp-content/plugins/calc_path/js/cars.js" type="text/javascript"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
<!--<script type="text/javascript" src="https://api-maps.yandex.ru/1.1/?key=API-ключ&modules=regions~metro" charset="utf-8"></script>-->
<script src="../wp-content/plugins/calc_path/js/deliveryCalculator.js" type="text/javascript"></script>
<div class="body_calc" id="body_calc">
    <div id="map" onclick="sh_panel('hide')"></div>
    <select id="current_city">
        <?
        if($_GET['city'] == "Анапа"){
            echo '<option selected="selected">Анапа</option>';
            echo '<option>Краснодар</option>';
        }
        if($_GET['city'] == "Краснодар" || !$_GET['city']){
            echo '<option>Анапа</option>';
            echo '<option selected="selected">Краснодар</option>';
        }
        ?>
    </select>
    <input type='button' id='block_screen' onclick='_dialog_("m_start")' value=''>
    <!--<input type='button' id='notify_before' onclick='_dialog_("m_start")' value=''>-->
    <input type='button' id='notify' onclick='_dialog_("m_start")' value='Выберите услугу'>
    <input type='button' id='added_service' onclick='_dialog_("more")' value='Услуги'>
	<div id="price" onclick="sh_panel('hide')"><b class="cost">От: <span id="cost">2000</span> руб</b></div>
</div>
<div class="windows_page" id="windows_page"></div>
<input type="button" id="panel_button_sh" onclick="sh_panel()" value="Далее">
<div class="body_cars" id="body_cars">
	<div class="slider_car" id="body_cars_sh">
        
	</div>
</div>
<script src="../wp-content/plugins/calc_path/js/windows.js" type="text/javascript"></script>
<script src="../wp-content/plugins/calc_path/js/main.js" type="text/javascript"></script>