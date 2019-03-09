<?php
/*
    Plugin Name: Calc Path
    Plugin URI: https://khodyr.ru
    Description: Калькулятор пути
    Version: 1.0
    Author: Александр Ходырев
    Author URI: https://khodyr.ru
    License: GPL2
*/

/*
    Copyright YEAR  Alexander Khodyrev  (email : admin@khodyr.ru)
 
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.
 
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
 
    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

*/
if (!defined('ABSPATH'))
    exit;

//header('Content-type: text/html; charset=utf-8');
header('Content-Type: application/json');
mb_internal_encoding("UTF-8");

define('MSP_CALC_DIR', plugin_dir_path(__FILE__));
define('MSP_CALC_DIR', plugin_dir_url(__FILE__));
wp_enqueue_script("jquery");

function page_calc_function() {
    require_once("calc_page.php");
}
add_shortcode('_page_calc_', 'page_calc_function');

add_action('admin_menu', function(){
	add_menu_page( 'Настройки калькулятора', 'Калькулятор', 'manage_options', 'site-options', 'add_my_setting', '', 4 ); 
} );

function add_my_setting(){
	?>
	<div class="wrap">
		<h2><?php echo get_admin_page_title() ?></h2>

        <?php
		// settings_errors() не срабатывает автоматом на страницах отличных от опций
		if( get_current_screen()->parent_base !== 'options-general' )
			settings_errors('название_опции');
		?>

		<?php
            settings_fields("opt_group");     // скрытые защитные поля
            do_settings_sections("opt_page"); // секции с настройками (опциями).
            //'../wp-content/plugins/calc_path/cars.json'
            $strJSON = fopen('../wp-content/plugins/calc_path/cars.json', 'r');
            $json_string = json_encode($strJSON, JSON_PRETTY_PRINT);
        ?>
            <style>
            #jsonCars {
                width: 100%;
                height: 300px;
                overflow: auto;
                background: #fff;
                border: 1px solid #ccc;
            }

            #jsonCarsTextarea {
                position: absolute;
                top: 143px;
                width: calc(97% + 3px);
                height: 300px;
                overflow: auto;
                background: #fff;
                border: 1px solid #ccc;
                resize: none;
                display: none;
            }
            </style>
            <h2>Шорткод калькулятора: [_page_calc_]</h2>
            <h2>Настройки авто:</h2>
            <div id="notice">
            </div>
            <pre contenteditable='true' id="jsonCars" >
<?php 
                if ($strJSON) {
                    $strJSONcontent = fread($strJSON, filesize('../wp-content/plugins/calc_path/cars.json'));
                    echo $strJSONcontent;
                    fclose($strJSON);
                } else {
                    echo 'Невозможно открыть cars_html.json';
                }?>
            </pre>
        <?php
            submit_button();
		?>
	</div>
	<script>
        function selectCarJson(){
            //v = document.getElementById('jsonCars').innerHTML.split(':').join('<span style=\'color: #553fc3;\'>:</span>');
            //document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"title"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"title"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"icon"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"icon"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"desc"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"desc"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"mesta"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"mesta"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"min_cost"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"min_cost"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"deliv_tarif_km"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"deliv_tarif_km"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"arenda_min"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"arenda_min"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"arenda_tarif"').join('<span style=\'color: #553fc3;font-weight: bold;\'>"arenda_tarif"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split(' "').join(' <span style=\'color: red;\'>"</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('" :').join('<span style=\'color: red;\'>"</span> :');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('":').join('<span style=\'color: red;\'>"</span>:');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('",').join('<span style=\'color: red;\'>"</span>,');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('"}').join('<span style=\'color: red;\'>"</span>}');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('{').join('<span style=\'color: #d23575;font-weight: bold;\'>{</span>');
            document.getElementById('jsonCars').innerHTML = v;
            v = document.getElementById('jsonCars').innerHTML.split('}').join('<span style=\'color: #d23575;font-weight: bold;\'>}</span>');
            document.getElementById('jsonCars').innerHTML = v;
            jsonContentSelection = document.getElementById('jsonCars').innerHTML;
        }
        var jsonContent;
        var selection = false;
        window.onload = function() {
            jsonContent = document.getElementById('jsonCars').innerHTML;
            
            jQuery('#jsonCars').focus(function(){
                if(!selection){
                    document.getElementById('jsonCars').innerHTML = jsonContent;
                    selection = true;
                }
            }).blur(function(){
                if(selection){
                    jsonContent = document.getElementById('jsonCars').innerHTML;
                    selectCarJson();
                    selection = false;
                }
            });
            selectCarJson();
            document.querySelector('[contenteditable]').addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.originalEvent || e).clipboardData.getData('text/plain');
                window.document.execCommand('insertText', false, text);
            });
        };
		document.getElementById("submit").onclick  = function(e) {
			var http = new XMLHttpRequest();

			var url = "../wp-content/plugins/calc_path/settings.php";
			var params = "enabled_cars="+jsonContent;
			http.open("POST", url, true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
				if(http.readyState == 4 && http.status == 200 && http.responseText == "saved") {
                    document.getElementById("notice").innerHTML = '<div class="notice notice-success is-dismissible" id="saved"><p>"Настройки обновлены!"</p></div>';
                    setTimeout(function(){
                        document.getElementById("saved").hidden = true;
                    }, 1000);
				}
			}
            http.send(params);
		}
	</script>
	<?php
}

function add_scripts_in_calc_page() {
	//wp_enqueue_style( 'bodystyle', plugins_url( 'css/main.css', __FILE__ ), false );
    //wp_enqueue_script( 'yamap', plugins_url( 'https://api-maps.yandex.ru/2.1/?lang=ru_RU', __FILE__ ), false );
    //wp_enqueue_script( 'map', plugins_url( 'js/deliveryCalculator.js', __FILE__ ), false );
    //wp_enqueue_script( 'app', plugins_url( 'js/cars.js', __FILE__ ), false );
    //wp_enqueue_script( 'app', plugins_url( 'js/windows.js', __FILE__ ), false );
    //wp_enqueue_script( 'app', plugins_url( 'js/main.js', __FILE__ ), false ); подключено в main_page.php
}
add_action("wp_footer", "add_scripts_in_calc_page");
?>