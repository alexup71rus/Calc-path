jQuery.noConflict();
var more_wishes = {};
var time_set_calc;
var data_set = "";
var more_wishes = "";
var service_;
var moreService;
var ft = "Нет";
var help = 0;

function _dialog_(type, data) {
    var content;
    if (type == "buy") {
        content = "\
			<input type='button' id='dialogWindowBodybefore' onclick='_dialog_();' value=''>\
			<div id='dialogWindowBody'>\
				<input type='button' id='closeWindow'onclick='_dialog_()' value=''>\
				<h4 class='TitleDialog' onmousedown='return false' onselectstart='return false' style='font-weight: 600;font-size: 14px;'>Оформить заказ: </h4>\
				<div style='margin-top: 10px; overflow:auto;max-height: 50vh;max-width: 300px;'><div id='button_item_left'>\
				<h4 class='TitleDialog' onmousedown='return false' onselectstart='return false' style='font-weight: 600;font-size: 14px;'>Детали к заказу: </h4>\
				";
        if (services_[0] == "checked") {
            data = "Расчитать по расстоянию"
        } else if (services_[1] == "checked") {
            data = "Расчитать по времени"
        } else if (services_[2] == "checked") {
            data = "Трезвый водитель"
        } else if (services_[3] == "checked") {
            data = "Курьерская услуга"
        } else if (services_[4] == "checked") {
            data = "Буксировка на тросу"
        } else if (services_[10] == "checked") {
            data = "Прикурить проводами"
        } else if (services_[11] == "checked") {
            data = "Прикурить бустером"
        } else if (services_[12] == "checked") {
            data = "Замена колеса"
        } else if (services_[13] == "checked") { data = "Доставка топлива" }
        service_ = data;

        moreService = "";
        if (services_[5] == "checked") {
            moreService += "<br> •Квитанция ";
        }
        if (services_[6] == "checked") {
            moreService += "<br> •Перевозка животного ";
        }
        if (services_[7] == "checked") {
            moreService += "<br> •Крупный багаж в салон ";
        }
        if (services_[8] == "checked") {
            moreService += "<br> •Детское кресло ";
        }
        if (services_[9] == "checked") {
            moreService += "<br> •Встреча с табличкой ";
        }
        if (moreService == "") {
            moreService = "Нет";
        }
        if (curSelection_car) {
            content += "\
                    <h4 class='textWindow' id='s_i0'>Услуга: " + data + "</h4>\
                    <h4 class='textWindow' id='s_i0'>Дополнительная услуга: " + moreService + "</h4>\
                    <h4 class='textWindow' id='s_i0'>Тариф: " + cars[curSelection_car]['title'] + "</h4>";
            if (services_[0] || services_[1]) {
                content += "<h4 class='textWindow' id='s_i0'>Места: " + cars[curSelection_car]['mesta'] + "</h4>";
            }
            if (time_set_calc) {
                content += "<h4 class='textWindow' id='s_i3'>Время аренды: " + time_set_calc + " ч.</h4>";
            }
            if (ft == "Да") {
                content += "<h4 class='textWindow' id='s_i3'>Туда и обрадно: Да</h4>";
            }
            content += "<h4 class='textWindow' id='s_i3'>Цена: " + price + "</h4>\
                    <h4 class='TitleDialog' style='font-weight: 600;font-size: 14px;color: #c75d5d;'>Предоплата (20%):</h4>\
                    <h4 class='textWindow' id='s_i0'  style='margin-top: -5px;'>" + Math.round(price / 100 * 20) + " руб.</h4>\
                    <h4 class='TitleDialog' onmousedown='return false' onselectstart='return false' style='font-weight: 600;font-size: 14px;'>Пожелания к заказу: </h4>\
                    <input type='text' id='wishes' onclick='' value='" + more_wishes + "' style='width: 100%;border: none;' placeholder='Нет пожеланий.'><br><br>\
                    <label id='my_price'><input name='check_service' id='my_pr_check' type='checkbox' value='' style='opacity: 1'> предложить свою цену</label>\
                    <div class='i_check'>\
                    <input type='number' min='3' max='24' step='any' id='wishes-price' onclick='' value='" + price + "' style='width: 100%;border: none;' placeholder='Время поездки (в часах)'>\
                    </div><br>\
                    <h4 class='TitleDialog' onmousedown='return false' onselectstart='return false' style='font-weight: 600;font-size: 14px;'>Номер для связи: </h4>\
                    <input type='text' id='phone_number' onclick='' value='+7(___)___-____' style='width: 100%;border: none;'>\
                    <input type='submit' id='go' onclick='' value='Заказать' style='float: right;margin-bottom: 0;'>\
                    </div></div>\
                </div>\
            ";
        } else {
            alert("Выберите маршрут и авто!");
            content = "";
        }
    } else if (type == "more") {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
        tomorrow = tomorrow.toJSON().slice(0, 10);
        if (services_[0] == "checked" || services_[1] == "checked") {
            data_set_min = tomorrow + "T00:00";
        }
        /* else {
            data_set_min = today.toJSON().slice(0, 16);
        }*/
        if (!data_set || data_set < data_set_min) { data_set = data_set_min; }
        content = "\
			<style>label{font-weight: lighter;cursor: pointer;width: 71%;border-radius: 3px;transition: .2s;}</style>\
			<input type='button' id='dialogWindowBodybefore' onclick='_dialog_();' value=''>\
			<div id='dialogWindowBody'>\
				<input type='button' id='closeWindow'onclick='_dialog_()' value=''>\
				<h4 class='TitleDialog' onmousedown='return false' onselectstart='return false' style='font-weight: 600;font-size: 14px;'>Услуги: </h4>\
				<div style='margin-top: 10px; overflow:auto;max-height: 50vh;'><div id='button_item_left' style='max-width:  295px;'>\
				<div style='max-width: 300px'>\
					<label id='lab1'><div class='icons_check icon0'></div><input name='check_service' id='t1' type='radio' value='t1' " + services_[0] + "> Расчитать по расстоянию</label><b style='float: right;color: #ccc;'> от 2000 руб</b><br>\
                    <div class='t_o_check'>\
					<label><input name='check_service' id='t_o' type='checkbox' value='' style='opacity: 1' ";
        if (ft == "Да") { content += "checked"; }
        content += "> туда и обратно</label>\
                    <b>Примечание:</b><br>\
                    <I style='color: #3fa952;'>Больше 100 км скидки до 50%</i><br>\
                    <i style='color: #3fa952;'>Бесплатное ожидание - до 4х часов</i><br>\
                    </div>\
                    <label id='lab2'><div class='icons_check icon1'></div><input name='check_service' id='t2' type='radio' value='t2' " + services_[1] + "> Расчитать по времени</label><b style='float: right;color: #ccc;'> от 4000 руб</b><br>\
					<div class='i_check'>\
					<b>Введите время поездки:</b>\
					<input type='number' min='3' max='24' step='any' id='wishes-arenda' onclick='' value='" + time_set_calc + "' style='width: 100%;border: none;' placeholder='Время поездки (в часах)'>\
                    <i style='color: #3fa952;'>От 6 часов скидка от 5%</i><br>\
                    </div>\
					<label id='lab3'><div class='icons_check icon2'></div><input name='check_service'id='t3' type='radio' value='t3' " + services_[2] + "> Трезвый водитель</label><b style='float: right;color: #ccc;'>от 1500 руб</b><br>\
					<label id='lab4'><div class='icons_check icon3'></div><input name='check_service' id='t4' type='radio' value='t4' " + services_[3] + "> Курьерская услуга</label><b style='float: right;color: #ccc;'>от 300 руб</b><br>\
					<label id='lab5'><div class='icons_check icon4'></div><input name='check_service' id='t5' type='radio' value='t5' " + services_[4] + "> Буксировка на тросу</label><b style='float: right;color: #ccc;'>от 700 руб</b><br>\
					<label id='lab11'><div class='icons_check icon10'></div><input name='check_service' id='t11' type='radio' value='t11' " + services_[10] + "> Прикурить проводами</label><b style='float: right;color: #ccc;'>от 600 руб</b><br>\
					<label id='lab12'><div class='icons_check icon11'></div><input name='check_service' id='t12' type='radio' value='t12' " + services_[11] + "> Прикурить бустером</label><b style='float: right;color: #ccc;'>от 1000 руб</b><br>\
					<label id='lab13'><div class='icons_check icon12'></div><input name='check_service' id='t13' type='radio' value='t13' " + services_[12] + "> Замена колеса</label><b style='float: right;color: #ccc;'>от 1000 руб</b><br>\
					<label id='lab14'><div class='icons_check icon13'></div><input name='check_service' id='t14' type='radio' value='t14' " + services_[13] + "> Доставка топлива</label><b style='float: right;color: #ccc;'>от 800 руб</b><br>\
					<br>\
					<b>Доп. услуги</b><br><br>\
					<label id='lab6'><div class='icons_check icon5'></div><input name='check_service' id='t6' type='checkbox' value='t6' " + services_[5] + "> Квитанция</label><b style='float: right;color: #ccc;'>100 руб</b><br>\
					<label id='lab7'><div class='icons_check icon6'></div><input name='check_service' id='t7' type='checkbox' value='t7' " + services_[6] + "> Перевозка животного</label><b style='float: right;color: #ccc;'>200 руб</b><br>\
					<label id='lab8'><div class='icons_check icon7'></div><input name='check_service' id='t8' type='checkbox' value='t8' " + services_[7] + "> Крупный багаж в салон</label><b style='float: right;color: #ccc;'>300 руб</b><br>\
					<label id='lab9'><div class='icons_check icon8'></div><input name='check_service' id='t9' type='checkbox' value='t9' " + services_[8] + "> Детское кресло</label><b style='float: right;color: #ccc;'>150 руб</b><br>\
					<label id='lab10'><div class='icons_check icon9'></div><input name='check_service' id='t10' type='checkbox' value='t10' " + services_[9] + "> Встреча с табличкой</label><b style='float: right;color: #ccc;'>300 руб</b><br>\
					<br><b>Дата и время начала:</b>\
					<input  type='datetime-local' min='" + data_set_min + "' id='wishes-arenda-data' onclick='' style='width: 100%;border: none;' value='" + data_set + "'><br><br>\
					<h4 class='TitleDialog' onmousedown='return false' onselectstart='return false' style='font-weight: 600;font-size: 14px;'>Что-то ещё? </h4>\
				</div>\
				<input type='text' id='wishes' onclick='' value='" + more_wishes + "' style='width: 100%;border: none;' placeholder='Пожелания к заказу...'>\
				<input type='submit' id='go' onclick='' value='Применить' style='float: right;margin-bottom: 0;'>\
				</div></div>\
			</div>\
		";
        try { if (content) { document.getElementById("windows_page").innerHTML = content; } } catch (e) {}
        jQuery(function($) {
            if (document.getElementById("block_screen").style.visibility != "visible" && help === 0) {
                document.getElementById("block_screen").style.visibility = "hidden";
                //document.getElementById("notify").style.display = "none";
                help = 1;
            }
            $("#dialogWindowBody").click(function() {
                if ($("#wishes-arenda").val() > 24) {
                    $("#wishes-arenda").val(24);
                    alert('Время поездки не может быть больше 24-х часов.');
                }
                if ($("#wishes-arenda").val() == 1 || $("#wishes-arenda").val() == 2 || $("#wishes-arenda").val() == "0") {
                    $("#wishes-arenda").val(3);
                    alert('Время поездки не может быть меньше 3-х часов.');
                }
            });
            $("#wishes-arenda").keyup(function() {
                if ($('#t1').is(':checked') || $('#t2').is(':checked')) {
                    if ($("#wishes-arenda").val() > 24) {
                        $("#wishes-arenda").val(24);
                        alert('Время поездки не может быть больше 24-х часов.');
                    }
                }
            });
            $("#wishes-arenda-data").keyup(function() {
                if ($('#t1').is(':checked') || $('#t2').is(':checked')) {
                    data_set_min = tomorrow + "T00:00";
                    if (data_set_min < $("#wishes-arenda-data").val()) {

                    } else if (data_set_min > $("#wishes-arenda-data").val()) {
                        $("#wishes-arenda-data").val(data_set_min);
                    }
                } else {
                    data_set_min = today.toJSON().slice(0, 10) + "T00:00";;
                }
            });

            if ($('#t1').is(':checked')) {
                $('.t_o_check').css({ "height": "105px" });
                $('#lab1').css({ "background": "#c6e2ff" });
            } else {
                $('.t_o_check').css({ "height": "0px" });
                $('#lab1').css({ "background": "#ffffff" });
            }
            if ($('#t2').is(':checked')) {
                $('#lab2').css({ "background": "#c6e2ff" });
                $('.i_check').css({ "height": "90px" });
            } else {
                $('#lab2').css({ "background": "#ffffff" });
                $('.i_check').css({ "height": "0px" });
            }
            if ($('#t3').is(':checked')) {
                $('#lab3').css({ "background": "#c6e2ff" });
            } else { $('#lab3').css({ "background": "#ffffff" }); }
            if ($('#t4').is(':checked')) {
                $('#lab4').css({ "background": "#c6e2ff" });
            } else { $('#lab4').css({ "background": "#ffffff" }); }
            if ($('#t5').is(':checked')) {
                $('#lab5').css({ "background": "#c6e2ff" });
            } else { $('#lab5').css({ "background": "#ffffff" }); }
            if ($('#t6').is(':checked')) {
                $('#lab6').css({ "background": "#c6e2ff" });
            } else { $('#lab6').css({ "background": "#ffffff" }); }
            if ($('#t7').is(':checked')) {
                $('#lab7').css({ "background": "#c6e2ff" });
            } else { $('#lab7').css({ "background": "#ffffff" }); }
            if ($('#t8').is(':checked')) {
                $('#lab8').css({ "background": "#c6e2ff" });
            } else { $('#lab8').css({ "background": "#ffffff" }); }
            if ($('#t9').is(':checked')) {
                $('#lab9').css({ "background": "#c6e2ff" });
            } else { $('#lab9').css({ "background": "#ffffff" }); }
            if ($('#t10').is(':checked')) {
                $('#lab10').css({ "background": "#c6e2ff" });
            } else { $('#lab10').css({ "background": "#ffffff" }); }
            if ($('#t11').is(':checked')) {
                $('#lab11').css({ "background": "#c6e2ff" });
            } else { $('#lab11').css({ "background": "#ffffff" }); }
            if ($('#t12').is(':checked')) {
                $('#lab12').css({ "background": "#c6e2ff" });
            } else { $('#lab12').css({ "background": "#ffffff" }); }
            if ($('#t13').is(':checked')) {
                $('#lab13').css({ "background": "#c6e2ff" });
            } else { $('#lab13').css({ "background": "#ffffff" }); }
            if ($('#t14').is(':checked')) {
                $('#lab14').css({ "background": "#c6e2ff" });
            } else { $('#lab14').css({ "background": "#ffffff" }); }

            $("label").click(function() {
                if ($('#t1').is(':checked') || $('#t2').is(':checked')) {
                    data_set_min = tomorrow + "T00:00";
                    $("#wishes-arenda-data").val(data_set_min);
                } else {
                    data_set_min = today.toJSON().slice(0, 10) + "T00:00";
                    $("#wishes-arenda-data").val(data_set_min);
                }
                if ($('#t1').is(':checked')) {
                    $('#lab1').css({ "background": "#c6e2ff" });
                    $('.t_o_check').css({ "height": "105px" });
                } else {
                    $('#lab1').css({ "background": "#ffffff" });
                    $('.t_o_check').css({ "height": "0px" });
                }
                if ($('#t2').is(':checked')) {
                    $('#lab2').css({ "background": "#c6e2ff" });
                    $('.i_check').css({ "height": "90px" });
                } else {
                    $('#lab2').css({ "background": "#ffffff" });
                    $('.i_check').css({ "height": "0px" });
                }
                if ($('#t3').is(':checked')) {
                    $('#lab3').css({ "background": "#c6e2ff" });
                } else { $('#lab3').css({ "background": "#ffffff" }); }
                if ($('#t4').is(':checked')) {
                    $('#lab4').css({ "background": "#c6e2ff" });
                } else { $('#lab4').css({ "background": "#ffffff" }); }
                if ($('#t5').is(':checked')) {
                    $('#lab5').css({ "background": "#c6e2ff" });
                } else { $('#lab5').css({ "background": "#ffffff" }); }
                if ($('#t6').is(':checked')) {
                    $('#lab6').css({ "background": "#c6e2ff" });
                } else { $('#lab6').css({ "background": "#ffffff" }); }
                if ($('#t7').is(':checked')) {
                    $('#lab7').css({ "background": "#c6e2ff" });
                } else { $('#lab7').css({ "background": "#ffffff" }); }
                if ($('#t8').is(':checked')) {
                    $('#lab8').css({ "background": "#c6e2ff" });
                } else { $('#lab8').css({ "background": "#ffffff" }); }
                if ($('#t9').is(':checked')) {
                    $('#lab9').css({ "background": "#c6e2ff" });
                } else { $('#lab9').css({ "background": "#ffffff" }); }
                if ($('#t10').is(':checked')) {
                    $('#lab10').css({ "background": "#c6e2ff" });
                } else { $('#lab10').css({ "background": "#ffffff" }); }
                if ($('#t11').is(':checked')) {
                    $('#lab11').css({ "background": "#c6e2ff" });
                } else { $('#lab11').css({ "background": "#ffffff" }); }
                if ($('#t12').is(':checked')) {
                    $('#lab12').css({ "background": "#c6e2ff" });
                } else { $('#lab12').css({ "background": "#ffffff" }); }
                if ($('#t13').is(':checked')) {
                    $('#lab13').css({ "background": "#c6e2ff" });
                } else { $('#lab13').css({ "background": "#ffffff" }); }
                if ($('#t14').is(':checked')) {
                    $('#lab14').css({ "background": "#c6e2ff" });
                } else { $('#lab14').css({ "background": "#ffffff" }); }
            });
            $("#go").click(function() {
                if (!$("#wishes-arenda").val() && $('#t2').is(':checked')) {
                    alert("Введите время поездки");
                } else if ($("#wishes-arenda").val() == 1 || $("#wishes-arenda").val() == 2 || $("#wishes-arenda").val() == "0") {
                    $("#wishes-arenda").val(3);
                    alert('Время поездки не может быть меньше 3-х часов.');
                } else if (data_set_min > $("#wishes-arenda-data").val()) {
                    alert("Неверная дата.");
                    $("#wishes-arenda-data").val(data_set_min);
                } else {
                    data_set = $("#wishes-arenda-data").val();
                    if ($("#wishes").val()) {
                        more_wishes = $("#wishes").val();
                    }
                    if ($('#t1').is(':checked')) {
                        if ($('#t_o').is(':checked')) {
                            ft = "Да";
                            if (length_path) {
                                price -= old_price;
                                if (calculate(Math.round(length_path / 1000 * 1.5)) > MINIMUM_COST) {
                                    price += calculate(Math.round(length_path / 1000 * 1.5));
                                    old_price = calculate(Math.round(length_path / 1000 * 1.5));
                                } else {
                                    price += calculate(Math.round(length_path / 1000));
                                    old_price = calculate(Math.round(length_path / 1000));
                                }
                                document.getElementById("cost").textContent = price;
                            }
                        } else {
                            ft = "Нет";
                            price -= old_price;
                            if (length_path) {
                                price += calculate(Math.round(length_path / 1000));
                                old_price = calculate(Math.round(length_path / 1000));
                            } else {
                                price += MINIMUM_COST;
                                old_price = MINIMUM_COST;
                            }
                            document.getElementById("cost").textContent = price;
                        }
                        if (services_[0] != "checked") {
                            sh_panel_type("distance");
                            myMap.destroy();
                            map_type = "";
                            init();
                            services_[0] = "checked";
                            if (curSelection_car) {
                                select_car(curSelection_car);
                            }
                        } else {
                            document.getElementById("panel_button_sh").style.visibility = "hidden";
                            document.getElementById("price").style.display = "none";
                        }
                        if (!curSelection_car) {
                            select_car('bussines');
                        }
                    } else if (!$('#t1').is(':checked') && services_[0] == "checked") {
                        services_[0] = "";
                        ft = "Нет";
                    }
                    if ($('#t2').is(':checked')) {
                        time_set_calc = $("#wishes-arenda").val();
                        if (services_[1] != "checked") {
                            sh_panel_type("time");
                            document.getElementById("panel_button_sh").style.visibility = "visible";
                            document.getElementById("price").style.display = "block";
                            myMap.destroy();
                            map_type = "timeset";
                            init();
                            document.getElementById("panel_button_sh").value = "Далее";
                            services_[1] = "checked";
                        }
                        if (curSelection_car) {
                            select_car(curSelection_car);
                        } else {
                            select_car('bussines');
                        }
                    } else if (!$('#t2').is(':checked') && services_[1] == "checked") {
                        time_set_calc = "";
                        services_[1] = "";
                        if (curSelection_car) {
                            select_car(curSelection_car);
                        } else {
                            select_car('bussines');
                        }
                    }
                    if ($('#t3').is(':checked')) {
                        if (services_[2] != "checked") {
                            sh_panel_type("distance");
                            myMap.destroy();
                            map_type = "";
                            init();
                        }
                        services_[2] = "checked";
                        select_car('bussines');
                        price -= old_price;
                        price += 1500;
                        old_price = 1500;
                        DELIVERY_TARIFF = 50;
                        MINIMUM_COST = 1500;
                        document.getElementById("cost").textContent = price;
                    } else if (!$('#t3').is(':checked') && services_[2] == "checked") {
                        services_[2] = "";
                        //document.getElementById("cost").textContent = price;
                    }
                    if ($('#t4').is(':checked')) {
                        if (services_[3] != "checked") {
                            sh_panel_type("distance");
                            myMap.destroy();
                            map_type = "";
                            init();
                        }
                        services_[3] = "checked";
                        select_car('bussines');
                        price -= old_price;
                        price += 300;
                        old_price = 300;
                        DELIVERY_TARIFF = 41;
                        MINIMUM_COST = 300;
                        document.getElementById("cost").textContent = price;
                    } else if (!$('#t4').is(':checked') && services_[3] == "checked") {
                        services_[3] = "";
                    }
                    if ($('#t5').is(':checked') && services_[4] != "checked") {
                        if (services_[4] != "checked") {
                            sh_panel_type("distance");
                            myMap.destroy();
                            map_type = "";
                            init();
                        }
                        services_[4] = "checked";
                        select_car('bussines');
                        price -= old_price;
                        price += 700;
                        old_price = 700;
                        DELIVERY_TARIFF = 60;
                        MINIMUM_COST = 700;
                        document.getElementById("cost").textContent = price;
                    } else if (!$('#t5').is(':checked') && services_[4] == "checked") {
                        services_[4] = "";
                    }
                    if ($('#t11').is(':checked') && services_[10] != "checked") {
                        if (services_[10] != "checked") {
                            sh_panel_type("time");
                            document.getElementById("panel_button_sh").style.visibility = "visible";
                            document.getElementById("price").style.visibility = "visible";
                            myMap.destroy();
                            map_type = "timeset";
                            init();
                            document.getElementById("panel_button_sh").value = "Заказать";
                        }
                        services_[10] = "checked";
                        select_car('bussines');
                        price -= old_price;
                        price += 600;
                        old_price = 600;
                        DELIVERY_TARIFF = 41;
                        MINIMUM_COST = 600;
                        document.getElementById("cost").textContent = price;
                    } else if (!$('#t11').is(':checked') && services_[10] == "checked") {
                        services_[10] = "";
                    }
                    if ($('#t12').is(':checked') && services_[11] != "checked") {
                        if (services_[11] != "checked") {
                            sh_panel_type("time");
                            document.getElementById("panel_button_sh").style.visibility = "visible";
                            document.getElementById("price").style.visibility = "visible";
                            myMap.destroy();
                            map_type = "timeset";
                            init();
                            document.getElementById("panel_button_sh").value = "Заказать";
                        }
                        services_[11] = "checked";
                        select_car('bussines');
                        price -= old_price;
                        price += 1000;
                        old_price = 1000;
                        DELIVERY_TARIFF = 41;
                        MINIMUM_COST = 1000;
                        document.getElementById("cost").textContent = price;
                    } else if (!$('#t12').is(':checked') && services_[11] == "checked") {
                        services_[11] = "";
                    }
                    if ($('#t13').is(':checked') && services_[12] != "checked") {
                        if (services_[12] != "checked") {
                            sh_panel_type("time");
                            document.getElementById("panel_button_sh").style.visibility = "visible";
                            document.getElementById("price").style.visibility = "visible";
                            myMap.destroy();
                            map_type = "timeset";
                            init();
                            document.getElementById("panel_button_sh").value = "Заказать";
                        }
                        services_[12] = "checked";
                        select_car('bussines');
                        price -= old_price;
                        price += 1000;
                        old_price = 1000;
                        DELIVERY_TARIFF = 41;
                        MINIMUM_COST = 1000;
                        document.getElementById("cost").textContent = price;
                    } else if (!$('#t13').is(':checked') && services_[12] == "checked") {
                        services_[12] = "";
                    }
                    if ($('#t14').is(':checked') && services_[13] != "checked") {
                        if (services_[13] != "checked") {
                            sh_panel_type("time");
                            document.getElementById("panel_button_sh").style.visibility = "visible";
                            document.getElementById("price").style.visibility = "visible";
                            myMap.destroy();
                            map_type = "timeset";
                            init();
                            document.getElementById("panel_button_sh").value = "Заказать";
                        }
                        services_[13] = "checked";
                        select_car('bussines');
                        price -= old_price;
                        price += 800;
                        old_price = 800;
                        DELIVERY_TARIFF = 41;
                        MINIMUM_COST = 800;
                        document.getElementById("cost").textContent = price;
                    } else if (!$('#t14').is(':checked') && services_[13] == "checked") {
                        services_[13] = "";
                    }




                    if ($('#t6').is(':checked') && services_[5] != "checked") {
                        services_[5] = "checked";
                        price += 100;
                        document.getElementById("cost").textContent = price;

                    } else if (!$('#t6').is(':checked') && services_[5] == "checked") {
                        services_[5] = "";
                        price -= 100;
                        document.getElementById("cost").textContent = price;
                    }
                    if ($('#t7').is(':checked') && services_[6] != "checked") {
                        services_[6] = "checked";
                        price += 200;
                        document.getElementById("cost").textContent = price;

                    } else if (!$('#t7').is(':checked') && services_[6] == "checked") {
                        services_[6] = "";
                        price -= 200;
                        document.getElementById("cost").textContent = price;
                    }
                    if ($('#t8').is(':checked') && services_[7] != "checked") {
                        services_[7] = "checked";
                        price += 300;
                        document.getElementById("cost").textContent = price;

                    } else if (!$('#t8').is(':checked') && services_[7] == "checked") {
                        services_[7] = "";
                        price -= 300;
                        document.getElementById("cost").textContent = price;
                    }
                    if ($('#t9').is(':checked') && services_[8] != "checked") {
                        services_[8] = "checked";
                        price += 150;
                        document.getElementById("cost").textContent = price;

                    } else if (!$('#t9').is(':checked') && services_[8] == "checked") {
                        services_[8] = "";
                        price -= 150;
                        document.getElementById("cost").textContent = price;
                    }
                    if ($('#t10').is(':checked') && services_[9] != "checked") {
                        services_[9] = "checked";
                        price += 300;
                        document.getElementById("cost").textContent = price;

                    } else if (!$('#t10').is(':checked') && services_[9] == "checked") {
                        services_[9] = "";
                        price -= 300;
                        document.getElementById("cost").textContent = price;
                    }


                    if (services_[0] || services_[1]) {
                        if (length_path) {
                            document.getElementById("panel_button_sh").style.visibility = "visible";
                            document.getElementById("price").style.visibility = "visible";
                        }
                    } else if (services_[2] || services_[3]) {
						document.getElementById("body_cars_sh").style.opacity = ".3";
                        document.getElementById("panel_button_sh").style.visibility = "visible";
                        document.getElementById("price").style.visibility = "visible";
                        document.getElementById("panel_button_sh").value = "Заказать";
                        //document.getElementById("body_cars").style.height = "20%";
                        //document.getElementById("panel_button_sh").style.bottom = "296px";
                    }
					else{document.getElementById("body_cars_sh").style.opacity = ".3";}

                    if (help === 1 || help === 2 || help === 3) {
                        document.getElementById("panel_button_sh").style.visibility = "hidden";
                        if (services_[0] || services_[2] || services_[3] || services_[4]) {
                            document.getElementById("notify").value = "Выберите маршрут";
                            help = 2;
                        } else if (services_[1] || services_[10] || services_[11] || services_[12] || services_[13]) {
                            document.getElementById("notify").value = "Куда подать машину?";
                            help = 3;
                        }
                    }
                    document.getElementById("windows_page").innerHTML = "";
                }
            });
        });
    } else if (type == "info") {
        content = "\
			<input type='button' id='dialogWindowBodybefore' onclick='_dialog_();' value=''>\
			<div id='dialogWindowBody'>\
				<input type='button' id='closeWindow'onclick='_dialog_()' value=''>\
				<h4 class='TitleDialog' onmousedown='return false' onselectstart='return false' style='font-weight: 600;font-size: 14px;style='width: 100%;min-width: 301px;''>" + cars[data]['title'] + ": </h4>\
				<div style='margin-top: 10px; overflow:auto;max-height: 50vh;max-width: 300px;'><div id='button_item_left'>\
				<h4 class='textWindow' id='desc-i' style='min-width: 301px;'>" + cars[data]['desc'] + "<b> и подобные</b></h4>\
				<h4 class='textWindow' id='mesta-i'><b>Места: </b>" + cars[data]['mesta'] + " чел.</h4>\
				<h4 class='textWindow' id='min_cost-i'><b>Цена за трансфер от: </b>" + cars[data]['min_cost'] + " руб.</h4>\
				<h4 class='textWindow' id='arenda_min-i'><b>Аренда с водителем от: </b>" + cars[data]['arenda_min'] + " руб.</h4>\
				</div>\</div>\
			</div>\
		";
        document.getElementById("windows_page").innerHTML = content;
    } else {
        if (help === 1 || help === 2 || help === 3) {
            document.getElementById("panel_button_sh").style.visibility = "hidden";
            if (services_[0] || services_[2] || services_[3] || services_[4]) {
                document.getElementById("notify").value = "Выберите маршрут";
                help = 2;
            } else if (services_[1] || services_[10] || services_[11] || services_[12] || services_[13]) {
                document.getElementById("notify").value = "Куда подать машину?";
                help = 3;
            }
        }
        document.getElementById("windows_page").innerHTML = "";
    }

    return content;
}