jQuery.noConflict();
sh_panel_type("distance");

let select = jQuery('#current_city');
select.on('change', function() {
    cCity = getUrlParameter('city');
    if (cCity) {
        history.pushState(null, null, "?city=" + select.val());
    } else {
        history.pushState(null, null, "?city=" + select.val());
    }
    current_city = select.val();
    myMap.destroy();
    init();
});

function sh_panel_type(type) {
    var http = new XMLHttpRequest();
    var url = "../wp-content/plugins/calc_path/cars_panel.php";
    var params = "type_cost=" + type;
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            document.getElementById("body_cars_sh").innerHTML = http.responseText;
            document.getElementById(oldSelection_car).classList.add("class_selectCar");
        }
    }
    http.send(params);
}

function sh_panel(doit) {
    if (doit) {
		/*
        //document.getElementById("body_cars").style.height = "20%";
        //document.getElementById("panel_button_sh").style.bottom = "296px";
        if (services_[0] || services_[1]) {
            //document.getElementById("panel_button_sh").value = "Далее";
        }
        document.body.style.overflowY = "auto";
		*/
    } else if (document.getElementById("panel_button_sh").style.visibility == "visible") {
        if (document.getElementById("panel_button_sh").value == "Заказать") {
            //document.getElementById("notify").style.display = "none";
			document.getElementById("notify").value = "";
            document.getElementById("windows_page").innerHTML = _dialog_("buy");

            jQuery("#go").click(function() {
                if (jQuery("#phone_number").val() === "+7(___)___-____") {
                    alert("Введите номер телефона.");
                } else {
                    sendOrder();
                }
            });

            jQuery("label").click(function() {
                if (jQuery('#my_pr_check').is(':checked')) {
                    jQuery('.i_check').css({ "height": "20px" });
                } else {
                    jQuery('.i_check').css({ "height": "0px" });
                }
            });

            function setCursorPosition(pos, elem) {
                elem.focus();
                if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
                else if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", pos);
                    range.moveStart("character", pos);
                    range.select()
                }
            }

            function mask(event) {
                var matrix = this.defaultValue,
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");
                def.length >= val.length && (val = def);
                matrix = matrix.replace(/[_\d]/g, function(a) {
                    return val.charAt(i++) || "_"
                });
                this.value = matrix;
                i = matrix.lastIndexOf(val.substr(-1));
                i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
                setCursorPosition(i, this)
            }

            var input = document.getElementById("phone_number");
            input.addEventListener("input", mask, false);
        } else {
            //document.getElementById("body_cars").style.height = "453px";
            //document.getElementById("panel_button_sh").style.bottom = "94%";
            document.getElementById("panel_button_sh").value = "Заказать";
			document.getElementById("panel_button_sh").style.visibility = "visible";
			document.getElementById("price").style.visibility = "visible";
            //document.body.style.overflowY = "hidden";
        }

    }
}

var services_ = [];
services_[0] = "checked";
var oldSelection_car = "bussines";
var curSelection_car;

function select_car(data, info) {
    if (data && length_path) {
        s_car(data);
    } else if (data && services_[1] && !length_path) {
        DELIVERY_TARIFF = cars[data]["arenda_tarif"]; // Стоимость за час.
        MINIMUM_COST = cars[data]["arenda_min"]; // Минимальная стоимость.
        price -= old_price;
        price += Math.round(time_set_calc * DELIVERY_TARIFF);
        old_price = Math.round(time_set_calc * DELIVERY_TARIFF);
    }

    function s_car(id) {
        if (services_[0] == "checked") {
			document.getElementById("panel_button_sh").style.visibility = "visible";
			document.getElementById("price").style.visibility = "visible";
			document.getElementById("panel_button_sh").value = "Заказать";
            DELIVERY_TARIFF = cars[data]["deliv_tarif_km"]; // Стоимость за километр.
            MINIMUM_COST = cars[data]["min_cost"]; // Минимальная стоимость.
            price -= old_price;
            if (ft == "Да" && length_path) {
                if (calculate(Math.round(length_path / 1000 * 1.5)) > MINIMUM_COST) {
                    price += calculate(Math.round(length_path / 1000 * 1.5));
                    old_price = calculate(Math.round(length_path / 1000 * 1.5));
                } else {
                    price += calculate(Math.round(length_path / 1000));
                    old_price = calculate(Math.round(length_path / 1000));
                }
                document.getElementById("cost").textContent = price;
            } else {
                price += calculate(Math.round(length_path / 1000));
                old_price = calculate(Math.round(length_path / 1000));
            }
        }
        if (services_[1] == "checked") {
			document.getElementById("panel_button_sh").style.visibility = "visible";
			document.getElementById("price").style.visibility = "visible";
			document.getElementById("panel_button_sh").value = "Заказать";
            car_feed = 0;
            DELIVERY_TARIFF = cars[data]["arenda_tarif"]; // Стоимость за час.
            MINIMUM_COST = cars[data]["arenda_min"]; // Минимальная стоимость.
            price -= old_price;
            var DELIVERY_TARIFF_km = cars[id]["deliv_tarif_km"];
            if ((length_path / 1000) < free_distance) { //-------
                price += MINIMUM_COST;
                old_price = MINIMUM_COST;
                price_pistance = 0;
            } else {
                price_pistance = (Math.round(length_path / 1000) * DELIVERY_TARIFF_km);
                price_pistance -= (free_distance * DELIVERY_TARIFF_km); //----------
                price += Math.round(time_set_calc * DELIVERY_TARIFF) + price_pistance;
                old_price = Math.round(time_set_calc * DELIVERY_TARIFF) + price_pistance;
                try { document.getElementById("car_send_cost").textContent = "Подача авто: " + price_pistance + " руб."; } catch (e) {}
            }
        }
        curSelection_car = id;
        if (oldSelection_car) {
            document.getElementById(oldSelection_car).classList.remove("class_selectCar");
        }
        document.getElementById(id).classList.add("class_selectCar");
        oldSelection_car = id;
        if (services_[0] == "checked") {
            full_price(_price_pistance_);
        }

        if (document.getElementById("car_send_cost") && car_feed) {
            if (_price_pistance_ > free_distance) {
                document.getElementById("car_send_cost").textContent = "Подача авто: " + car_feed + " руб.";
            } else {
                document.getElementById("car_send_cost").textContent = "Подача авто: бесплатно ";
            }
        }
    }
    document.getElementById("cost").textContent = price;
    if (info) {
        _dialog_("info", data);
    }
}

function calculate(routeLength) {
    return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
}

function sendOrder() {
    more_wishes = jQuery("#wishes").val();
    num = jQuery("#phone_number").val();
    my_price = jQuery('#wishes-price').val();
    var http = new XMLHttpRequest();
    var url = "../wp-content/plugins/calc_path/sendOrder.php";
	console.log(url);
    var params = "";
    if (services_[0] == "checked") {
        params += "from=" + adress_from;
    } else if (services_[2] == "checked") {
        params += "from=" + adress_from;
    } else if (services_[3] == "checked") {
        params += "from=" + adress_from;
    } else if (services_[4] == "checked") {
        params += "from=" + adress_from;
    }
    params += "&to=" + adress_to + "&price=" + price + "&service=" + service_ + "&more_service=" + moreService + "&tariff=" + cars[curSelection_car]['title'] + "&wishes=" + more_wishes + "&customPrice=" + my_price + "&num=" + num + "&datatime=" + data_set;

    if (services_[0] || services_[1]) {
        //params += "<h4 class='textWindow' id='s_i0'>Места: " + cars[curSelection_car]['mesta'] + "</h4>";
    }
    if (time_set_calc) {
        params += "&time_calc=" + time_set_calc + " ч.";
    }
    if (ft == "Да") {
        params += "&from_to=Туда и обрадно: Да";
    }
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            //console.log(http.responseText);
        }
        _dialog_();
    }
    http.send(params);
    alert("Спасибо за заказ!");
}