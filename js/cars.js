var cars = {};
var http = new XMLHttpRequest();
var url = "../wp-content/plugins/calc_path/read_cars.php";
http.open("POST", url, true);

http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
var dta;
http.onreadystatechange = function() { //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
        dta = http.responseText;
        //dta = dta.split('&#160;').join(' ');
        cars = JSON.parse(dta);
    }
}
http.send();


/*var cars = {
	bussines:{
		id: 0,
		title: "Бизнес",
		icon: "./src/img/4.png",
		desc: "Mercedes E-class",
		mesta: 4,
		min_cost: 2000, //минималка в рублях
		deliv_tarif_km: 40, //стоимость 1 км
		arenda_min: 4000, //минималка аренды
		arenda_tarif: 1400, //  аренда за 1 час 
		visible: true
	},
	premium:{
		id: 1,
		title: "Премиум",
		icon: "./src/img/premium.png",
		desc: "Mercedes S-class",
		mesta: 3,
		min_cost: 5000, //минималка в рублях
		deliv_tarif_km: 75, //стоимость 1 км
		arenda_min: 5000, //минималка аренды
		arenda_tarif: 2200, //  аренда за 1 час
		visible: true
	},
	miniven:{
		id: 2,
		title: "Минивэн",
		icon: "./src/img/minivan.png",
		desc: "Ford Galaxy",
		mesta: 8,
		min_cost: 3000, //минималка в рублях
		deliv_tarif_km: 38, //стоимость 1 км
		arenda_min: 4000, //минималка аренды
		arenda_tarif: 1300, //  аренда за 1 час
		visible: true
	},
	miniven_plus:{
		id: 3,
		title: "Минивэн+",
		icon: "./src/img/miniven+viano.png",
		desc: "Mercedes-Benz Viano",
		mesta: 7,
		min_cost: 4000, //минималка в рублях
		deliv_tarif_km: 52, //стоимость 1 км
		arenda_min: 5000, //минималка аренды
		arenda_tarif: 1700, //  аренда за 1 час
		visible: true
	},
	miniven_vip:{
		id: 4,
		title: "Минивэн Vip",
		icon: "./src/img/minivan-vip.png",
		desc: "Mercedes-Benz V-class",
		mesta: 6,
		min_cost: 6000, //минималка в рублях
		deliv_tarif_km: 77, //стоимость 1 км
		arenda_min: 6000, //минималка аренды
		arenda_tarif: 2500, //  аренда за 1 час
		visible: true
	},
	minibus:{
		id: 6,
		title: "Микроавтобус",
		icon: "./src/img/microavtobus-20.png",
		desc: "Mercedes-Benz Sprinter",
		mesta: 21,
		min_cost: 5000, //минималка в рублях
		deliv_tarif_km: 63, //стоимость 1 км
		arenda_min: 5000, //минималка аренды
		arenda_tarif: 1500, //  аренда за 1 час
		visible: true
	},
	minibus_vip:{
		id: 7,
		title: "Микроавтобус Vip",
		icon: "./src/img/vip+sprinter.png",
		desc: "Mercedes-Benz Sprinter Vip",
		mesta: 21,
		min_cost: 5000, //минималка в рублях
		deliv_tarif_km: 74, //стоимость 1 км
		arenda_min: 5000, //минималка аренды
		arenda_tarif: 1800, //  аренда за 1 час
		visible: true
	},
	marshrutka:{
		id: 8,
		title: "Маршрутка",
		icon: "./src/img/marshrutka.png",
		desc: "Hyndai County",
		mesta: 19,
		min_cost: 4000, //минималка в рублях
		deliv_tarif_km: 58, //стоимость 1 км
		arenda_min: 4000, //минималка аренды
		arenda_tarif: 1100, //  аренда за 1 час
		visible: true
	},
	bus:{
		id: 10,
		title: "Автобус",
		icon: "./src/img/avtobus_new.png",
		desc: "Mercedes",
		mesta: 50,
		min_cost: 8000, //минималка в рублях
		deliv_tarif_km: 132, //стоимость 1 км
		arenda_min: 8000, //минималка аренды
		arenda_tarif: 2000, //  аренда за 1 час
		visible: true
	},
	bus_vip:{
		id: 10,
		title: "Автобус Vip",
		icon: "./src/img/avtobus_new.png",
		desc: "Mercedes",
		mesta: 50,
		min_cost: 8000, //минималка в рублях
		deliv_tarif_km: 132, //стоимость 1 км
		arenda_min: 8000, //минималка аренды
		arenda_tarif: 2000, //  аренда за 1 час
		visible: true
	}
};*/