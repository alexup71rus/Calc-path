let myMap;
let car_feed;
let free_distance = 5;
let price = 2000;
let old_price = 2000;
let price_pistance = 0;
let _price_pistance_ = 0;
// Стоимость за километр.
let DELIVERY_TARIFF = 40;
// Минимальная стоимость.
let MINIMUM_COST = 2000;
let length_path;
let duration_in_traffic;
let duration_path;
let length;
let from = [];
let to = [];
let activeRoute;

let adress_from;
let adress_to;
let map_type;

let current_city;
var city = getUrlParameter('city');
if (city) {
    current_city = city;
} else {
    current_city = "Краснодар";
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function init() {
    if (!current_city || current_city === "Краснодар") {
        free_distance = 5;
        if (map_type == "timeset") {
            adress_from = "";
            adress_to = "";
            from = [];
            to = [];
            myMap = new ymaps.Map('map', {
                    center: [45.05357520085762, 38.986239092773424],
                    zoom: 12,
                    controls: []
                }),
                // Создадим панель маршрутизации.
                routePanelControl = new ymaps.control.RoutePanel({
                    options: {
                        // Добавим заголовок панели.
                        showHeader: false,
                        title: 'Калькулятор пути'
                    }
                });

            routePanelControl.routePanel.options.set({
                types: { auto: true }
            });

            routePanelControl.routePanel.state.set({
                // Тип маршрутизации.
                type: 'masstransit',
                fromEnabled: false,
                from: [45.05357520085762, 38.986239092773424],
                toEnabled: true
            });
        } else {
            adress_from = "";
            adress_to = "";
            from = [];
            to = [];
            myMap = new ymaps.Map('map', {
                    center: [45.05357520085762, 38.986239092773424],
                    zoom: 12,
                    controls: []
                }),
                // Создадим панель маршрутизации.
                routePanelControl = new ymaps.control.RoutePanel({
                    options: {
                        // Добавим заголовок панели.
                        showHeader: false,
                        title: 'Калькулятор пути'
                    }
                });

            // Пользователь сможет построить только автомобильный маршрут.
            routePanelControl.routePanel.options.set({
                types: { auto: true }
            });
        }

        /*------------------------------------*/
        myCircle = new ymaps.Circle([myMap.getCenter(), 4400], {
            balloonContentBody: 'Бесплатная подача авто в этой области<br>Примерное время ожидания: 20 мин.',
            hintContent: 'Бесплатная подача авто'
        }, {
            draggable: false,
            fillColor: "#5285b700",
            strokeColor: "#5285b73b",
            strokeOpacity: 0.7,
            strokeWidth: 4
        });

        myMap.geoObjects.add(myCircle);
        /*------------------------------------*/
    } else if (!current_city || current_city === "Анапа") {
        free_distance = 2;
        if (map_type == "timeset") {
            adress_from = "";
            adress_to = "";
            from = [];
            to = [];
            myMap = new ymaps.Map('map', {
                    center: [44.8907712110496, 37.31361850000002],
                    zoom: 14,
                    controls: []
                }),
                // Создадим панель маршрутизации.
                routePanelControl = new ymaps.control.RoutePanel({
                    options: {
                        // Добавим заголовок панели.
                        showHeader: false,
                        title: 'Калькулятор пути'
                    }
                });

            routePanelControl.routePanel.options.set({
                types: { auto: true }
            });

            routePanelControl.routePanel.state.set({
                // Тип маршрутизации.
                type: 'masstransit',
                fromEnabled: false,
                from: [44.891381335187134, 37.314648468261744],
                toEnabled: true
            });
        } else {
            adress_from = "";
            adress_to = "";
            from = [];
            to = [];
            myMap = new ymaps.Map('map', {
                    center: [44.8907712110496, 37.31361850000002],
                    zoom: 14,
                    controls: []
                }),
                // Создадим панель маршрутизации.
                routePanelControl = new ymaps.control.RoutePanel({
                    options: {
                        // Добавим заголовок панели.
                        showHeader: false,
                        title: 'Калькулятор пути'
                    }
                });

            // Пользователь сможет построить только автомобильный маршрут.
            routePanelControl.routePanel.options.set({
                types: { auto: true }
            });
        }
        /*------------------------------------*/
        myCircle = new ymaps.Circle([myMap.getCenter(), 2000], {
            balloonContentBody: 'Бесплатная подача авто в этой области<br>Примерное время ожидания: 20 мин.',
            hintContent: 'Бесплатная подача авто'
        }, {
            draggable: false,
            fillColor: "#5285b700",
            strokeColor: "#5285b73b",
            strokeOpacity: 0.7,
            strokeWidth: 4
        });

        myMap.geoObjects.add(myCircle);
        /*------------------------------------*/
    }

    zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: 'рш',
            float: 'none',
            position: {
                top: 60,
                right: 10
            }
        }
    });

    myMap.controls.add(routePanelControl).add(zoomControl);
	myMap.behaviors.disable('scrollZoom');
	//myMap.behaviors.disable('multiTouch');

    var trafficControl = new ymaps.control.TrafficControl({
        state: {
            // Отображаются пробки "Сейчас".
            providerKey: 'traffic#actual',
            // Начинаем сразу показывать пробки на карте.
            trafficShown: false,
        }
    });

    // Добавим контрол на карту.
    myMap.controls.add(routePanelControl).add(trafficControl);
    // Получим ссылку на провайдер пробок "Сейчас" и включим показ инфоточек.
    trafficControl.getProvider('traffic#actual').state.set('infoLayerShown', true);


    // Получим ссылку на маршрут.
    routePanelControl.routePanel.getRouteAsync().then(function(route) {
        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({ results: 2 }, true);
        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function() {
            activeRoute = route.getActiveRoute();
            if (activeRoute) {
                //console.log(route.getActiveRoute().properties.get("boundedBy"));
                from = routePanelControl.routePanel.state.get("from");
                to = routePanelControl.routePanel.state.get("to");
                if (!current_city || current_city === "Краснодар") {
                    if (/\d/.test(from)) { //Если координаты
                    } else {
                        //Если слова
                        crds(from, function(coords) { // работаем с координатами
                            from = coords;
                            ymaps.route([
                                [45.05357520085762, 38.986239092773424],
                                [coords[0], coords[1]]
                            ]).then(function(ro) {
                                //myMap.geoObjects.add(ro); // раскомментируйте чтобы увидеть маршрут
                                //пишем дистанцию на метке
                                full_price(Math.round(ro.getLength() / 1000));
                                needed_point.properties.set({ iconContent: _price_pistance_ });
                            });
                        });
                    }
                    if (/\d/.test(to)) { //Если координаты
                    } else {
                        //Если слова
                        crds(to, function(coords) { // работаем с координатами
                            to = coords;
                        });
                    }
                } else if (current_city === "Анапа") {
                    if (/\d/.test(from)) { //Если координаты
                    } else {
                        //Если слова
                        crds(from, function(coords) { // работаем с координатами
                            from = coords;
                            ymaps.route([
                                [44.8907712110496, 37.31361850000002],
                                [coords[0], coords[1]]
                            ]).then(function(ro) {
                                //myMap.geoObjects.add(ro); // раскомментируйте чтобы увидеть маршрут
                                //пишем дистанцию на метке
                                full_price(Math.round(ro.getLength() / 1000));
                                needed_point.properties.set({ iconContent: _price_pistance_ });
                            });
                        });
                    }
                    if (/\d/.test(to)) { //Если координаты
                    } else {
                        //Если слова
                        crds(to, function(coords) { // работаем с координатами
                            to = coords;
                        });
                    }
                }
                duration_in_traffic = route.getActiveRoute().properties.get("durationInTraffic");
                duration_path = route.getActiveRoute().properties.get("duration");
                length = route.getActiveRoute().properties.get("distance");
                length_path = length.value;
                // Вычислим стоимость доставки.
                if (!curSelection_car) { curSelection_car = "bussines"; }
                if (curSelection_car) {
                    var myGeocoderfrom = ymaps.geocode(from);
                    var myGeocoderto = ymaps.geocode(to);
                    myGeocoderfrom.then(
                        function(res) {
                            adress_from = res.geoObjects.get(0).properties.get('text');
                        });
                    myGeocoderto.then(
                        function(res) {
                            adress_to = res.geoObjects.get(0).properties.get('text');
                        });
                    if (services_[0] == "checked") {
                        DELIVERY_TARIFF = cars[curSelection_car]["deliv_tarif_km"]; // Стоимость за километр.
                        MINIMUM_COST = cars[curSelection_car]["min_cost"]; // Минимальная стоимость.
                        price -= old_price;
                        if (ft == "Да") {
                            if (calculate(Math.round(length_path / 1000 * 1.5)) > MINIMUM_COST) {
                                price += calculate(Math.round(length_path / 1000 * 1.5));
                                old_price = calculate(Math.round(length_path / 1000 * 1.5));
                            } else {
                                price += calculate(Math.round(length_path / 1000));
                                old_price = calculate(Math.round(length_path / 1000));
                            }
                        } else {
                            price += calculate(Math.round(length_path / 1000));
                            old_price = calculate(Math.round(length_path / 1000));
                            ft_cost = 0;
                        }
                    } else if (services_[1] == "checked") {
                        var DELIVERY_TARIFF_km = cars[curSelection_car]["deliv_tarif_km"];
                        DELIVERY_TARIFF = cars[curSelection_car]["arenda_tarif"]; // Стоимость за час.
                        MINIMUM_COST = cars[curSelection_car]["arenda_min"]; // Минимальная стоимость.
                        price -= old_price;
                        if ((length_path / 1000) < free_distance) { //-------
                            price += Math.round(time_set_calc * DELIVERY_TARIFF);
                            old_price = Math.round(time_set_calc * DELIVERY_TARIFF);
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>Подача авто бесплатная!<br>Примерное время ожидания: 20 мин.</span>');
                        } else {
                            price_pistance = (Math.round(length_path / 1000) * DELIVERY_TARIFF_km);
                            price_pistance -= ((free_distance) * DELIVERY_TARIFF_km); //----------
                            price += Math.round(time_set_calc * DELIVERY_TARIFF) + price_pistance;
                            old_price = Math.round(time_set_calc * DELIVERY_TARIFF) + price_pistance;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>' + duration_in_traffic.text + ", " + length.text + '&nbsp;<br><div id="car_send_cost">Подача авто стоит: ' + (price_pistance) + ' руб</div></span>');
                        }
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);

                    } else if (services_[2] == "checked") {
                        DELIVERY_TARIFF = 50; // Стоимость за километр.
                        MINIMUM_COST = 1500; // Минимальная стоимость.
                        if ((length_path / 1000) < 3) {
                            price -= old_price;
                            price += MINIMUM_COST;
                            old_price = MINIMUM_COST;
                        } else {
                            price_pistance = (Math.round(length_path / 1000) * DELIVERY_TARIFF);
                            price_pistance -= (3 * DELIVERY_TARIFF);
                            price -= old_price;
                            price += price_pistance + MINIMUM_COST;
                            old_price = price_pistance + MINIMUM_COST;
                        }
                    } else if (services_[3] == "checked") {
                        DELIVERY_TARIFF = 41; // Стоимость за километр.
                        MINIMUM_COST = 300; // Минимальная стоимость.
                        if ((length_path / 1000) < 2) {
                            price -= old_price;
                            price += MINIMUM_COST;
                            old_price = MINIMUM_COST;
                        } else {
                            price_pistance = (Math.round(length_path / 1000) * DELIVERY_TARIFF);
                            price_pistance -= (2 * DELIVERY_TARIFF);
                            price -= old_price;
                            price += price_pistance + MINIMUM_COST;
                            old_price = price_pistance + MINIMUM_COST;
                        }
                    } else if (services_[4] == "checked") {
                        DELIVERY_TARIFF = 60; // Стоимость за километр.
                        MINIMUM_COST = 700; // Минимальная стоимость.
                        if ((length.value / 1000) < 3) {
                            price -= old_price;
                            price += MINIMUM_COST;
                            old_price = MINIMUM_COST;
                        } else {
                            price_pistance = (Math.round(length.value / 1000) * DELIVERY_TARIFF);
                            price_pistance -= (3 * DELIVERY_TARIFF);
                            price -= old_price;
                            price += price_pistance + MINIMUM_COST;
                            old_price = price_pistance + MINIMUM_COST;
                        }
                    } else if (services_[10] == "checked") {
                        DELIVERY_TARIFF = 41; // Стоимость за километр.
                        MINIMUM_COST = 600; // Минимальная стоимость.
                        if ((length_path / 1000) < 5) { //----------
                            price -= old_price;
                            price += MINIMUM_COST;
                            old_price = MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>Подача авто бесплатная!<br>Примерное время ожидания: 20 мин.</span>');
                        } else {
                            price_pistance = (Math.round(length.value / 1000) * DELIVERY_TARIFF);
                            price_pistance -= (5 * DELIVERY_TARIFF); //----------
                            price -= old_price;
                            price += price_pistance + MINIMUM_COST;
                            old_price = price_pistance + MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>' + duration_in_traffic.text + ", " + length.text + '&nbsp;<br>Подача авто стоит: ' + (price_pistance) + ' руб</span>');
                        }
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                    } else if (services_[11] == "checked") {
                        DELIVERY_TARIFF = 41; // Стоимость за километр.
                        MINIMUM_COST = 1000; // Минимальная стоимость.
                        if ((length_path / 1000) < 5) { //----------
                            price -= old_price;
                            price += MINIMUM_COST;
                            old_price = MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>Подача авто бесплатная!<br>Примерное время ожидания: 20 мин.</span>');
                        } else {
                            price_pistance = (Math.round(length.value / 1000) * DELIVERY_TARIFF);
                            price_pistance -= (5 * DELIVERY_TARIFF); //----------
                            price -= old_price;
                            price += price_pistance + MINIMUM_COST;
                            old_price = price_pistance + MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>' + duration_in_traffic.text + ", " + length.text + '&nbsp;<br>Подача авто стоит: ' + (price_pistance) + ' руб</span>');
                        }
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                    } else if (services_[12] == "checked") {
                        DELIVERY_TARIFF = 41; // Стоимость за километр.
                        MINIMUM_COST = 1000; // Минимальная стоимость.
                        if ((length_path / 1000) < 5) { //----------
                            price -= old_price;
                            price += MINIMUM_COST;
                            old_price = MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>Подача авто бесплатная!<br>Примерное время ожидания: 20 мин.</span>');
                        } else {
                            price_pistance = (Math.round(length.value / 1000) * DELIVERY_TARIFF);
                            price_pistance -= (5 * DELIVERY_TARIFF); //----------
                            price -= old_price;
                            price += price_pistance + MINIMUM_COST;
                            old_price = price_pistance + MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>' + duration_in_traffic.text + ", " + length.text + '&nbsp;<br>Подача авто стоит: ' + (price_pistance) + ' руб</span>');
                        }
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                    } else if (services_[13] == "checked") {
                        DELIVERY_TARIFF = 41; // Стоимость за километр.
                        MINIMUM_COST = 800; // Минимальная стоимость.
                        if ((length_path / 1000) < 5) { //----------
                            price -= old_price;
                            price += MINIMUM_COST;
                            old_price = MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>Подача авто бесплатная!<br>Примерное время ожидания: 20 мин.</span>');
                        } else {
                            price_pistance = (Math.round(length.value / 1000) * DELIVERY_TARIFF);
                            price_pistance -= (5 * DELIVERY_TARIFF); //----------
                            price -= old_price;
                            price += price_pistance + MINIMUM_COST;
                            old_price = price_pistance + MINIMUM_COST;
                            balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>' + duration_in_traffic.text + ", " + length.text + '&nbsp;<br>Подача авто стоит: ' + (price_pistance) + ' руб</span>');
                        }
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                    }

                    if (services_[1] != "checked" && services_[10] != "checked" && services_[11] != "checked" && services_[12] != "checked" && services_[13] != "checked") {
                        if (!current_city || current_city === "Краснодар") {
                            ymaps.route([
                                [45.05109384, 38.98667481],
                                [from[0], from[1]]
                            ]).then(function(ro) {
                                //myMap.geoObjects.add(ro); // раскомментируйте чтобы увидеть маршрут
                                //пишем дистанцию на метке
                                full_price(Math.round(ro.getLength() / 1000));
                                needed_point.properties.set({ iconContent: _price_pistance_ });
                            });
                        } else if (current_city === "Анапа") {
                            ymaps.route([
                                [44.8907712110496, 37.31361850000002],
                                [from[0], from[1]]
                            ]).then(function(ro) {
                                //myMap.geoObjects.add(ro); // раскомментируйте чтобы увидеть маршрут
                                //пишем дистанцию на метке
                                full_price(Math.round(ro.getLength() / 1000));
                                needed_point.properties.set({ iconContent: _price_pistance_ });
                            });
                        }

                        balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                            '<span>\
                            <div style="background-image: url(../wp-content/plugins/calc_path/img/icons/car.svg);background-size: contain;display: inline-block;background-repeat: no-repeat;padding: 6px 9px 5px 5px;"></div>\
                            ' + duration_in_traffic.text + ", " + length.text + '&nbsp;</span>&nbsp;&nbsp;&nbsp;<br>\
                            <span style="color: #999;font-size:  12px;">Без пробок: ' + duration_path.text + '<br><div id="car_send_cost">Подача авто: бесплатно</div></span>');
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                    } else {
                        price -= old_price_dist;
                        old_price_dist = 0;
                    }
                }
				
                if (help === 2) {
                    //document.getElementById("notify").style.display = "none";
					document.getElementById("notify").value = "Выберите тариф";
					if (services_[0] == "checked" || services_[1] == "checked") {
						document.getElementById("body_cars_sh").style.opacity = "1";
						document.getElementById("panel_button_sh").style.visibility = "visible";
						document.getElementById("price").style.visibility = "visible";
						document.getElementById("panel_button_sh").value = "Заказать";
					}else{
						document.getElementById("panel_button_sh").style.visibility = "visible";
						document.getElementById("price").style.visibility = "visible";
						document.getElementById("panel_button_sh").value = "Заказать";
					}
                    help = 999;
                } else if (help === 3) {
                    //document.getElementById("notify").style.display = "none";
					document.getElementById("notify").value = "";
					if (services_[0] == "checked" || services_[1] == "checked") {
						document.getElementById("body_cars_sh").style.opacity = "1";
						document.getElementById("panel_button_sh").style.visibility = "visible";
						document.getElementById("price").style.visibility = "visible";
						document.getElementById("panel_button_sh").value = "Заказать";
					}else{
						document.getElementById("panel_button_sh").style.visibility = "visible";
						document.getElementById("price").style.visibility = "visible";
						document.getElementById("panel_button_sh").value = "Заказать";
					}
                    help = 999;
                }

                //document.getElementById("panel_button_sh").style.visibility = "visible";
                //document.getElementById("price").style.visibility = "visible";
                document.getElementById("cost").textContent = price;

                // Откроем балун.
                activeRoute.balloon.open();
            }
        });
    });
    // Функция, вычисляющая стоимость доставки.
    function calculate(routeLength) {
        return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
    }
}
ymaps.ready(init);

var old_price_dist = 0;

function full_price(dist) {
    _price_pistance_ = dist;
    price -= old_price_dist;
    if (dist > free_distance) {
        old_price_dist = Math.round((dist - free_distance) * DELIVERY_TARIFF);
        car_feed = old_price_dist;
        price += car_feed;
        document.getElementById("cost").textContent = price;
    } else {
        old_price_dist = 0;
        document.getElementById("cost").textContent = price;
    }

    var cost_car_feed = setInterval(function() {
        if (document.getElementById("car_send_cost") && car_feed) {
            if (_price_pistance_ > free_distance) {
				clearInterval(cost_car_feed);
                document.getElementById("car_send_cost").textContent = "Подача авто: " + car_feed + " руб.";
            } else {
				clearInterval(cost_car_feed);
                document.getElementById("car_send_cost").textContent = "Подача авто: бесплатно ";
            }
        }
    }, 600);
}

function crds(crd, callback) {
    ymaps.geocode(crd).then(function(res) {
        callback(res.geoObjects.get(0).geometry.getCoordinates());
    });
}