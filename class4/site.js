var carList = []

function loadLocalStorage() {
    var cars = localStorage.getItem('cars');

    if (cars !== null && cars.length > 0) {
        carList = JSON.parse(cars);
        renderCars();
    }
}

function addCar() {
    var engine = document.getElementById("engineId");
    var color = document.getElementById("colorId");
    var manufacturer = document.getElementById("manufacturerId");
    var maxId = 0;

    if (carList.length > 0) {
        maxId = carList.map(function(car){
            return car.id;
        }).sort()[carList.length - 1];
    };

    carList.push({ id: ++maxId, engine: engine.value, color: color.value, manufacturer: manufacturer.value })

    renderCars();
}

function renderCars() {
    
    storeListOnLocalStorage();

    var tableHtml = []

    tableHtml.push("<table class='table table-condensed'><tr><th>Engine</th><th>Color</th><th>Manufacturer</th><th></th></tr>");

    for (var i = 0; i < carList.length; i++) {
        tableHtml.push(`<tr><td>${carList[i].engine}</td><td>${carList[i].color}</td><td>${carList[i].manufacturer}</td>
                <td align='right'>
                    <input type='button' onclick='updateCar(${carList[i].id})' value='Update' />
                    <input type='button' onclick='removeCar(${carList[i].id})' value='Delete' />
                </td>
            </tr>`);
    }
    
    tableHtml.push("</table>");

    var dataElement = document.getElementById("displayData");
    dataElement.innerHTML = tableHtml.join("");
}

function storeListOnLocalStorage() {
    localStorage.setItem('cars', JSON.stringify(carList));
}

function updateCar(carId) {
    localStorage.setItem('updateId', carId);
    window.location.href = 'update.html';
}

function removeCar(carId) {
    var carListFiltered = carList.filter(function(car) {
        return car.id !== carId;
    });
    carList = carListFiltered;
    renderCars();
}

function loadUpdateCar() {

    var cars = localStorage.getItem('cars');

    if (cars !== null && cars.length > 0) {
        carList = JSON.parse(cars);
    }

    var updateId = localStorage.getItem('updateId');

    var car = carList.filter(function(car) {
        return car.id == updateId;
    });

    var engine = document.getElementById("engineId");
    var color = document.getElementById("colorId");
    var manufacturer = document.getElementById("manufacturerId");

    engine.value = car[0].engine;
    color.value = car[0].color;
    manufacturer.value = car[0].manufacturer;
}

function updateCar() {
    var updateId = localStorage.getItem('updateId');

    var car = carList.filter(function(car) {
        return car.id == updateId;
    });

    car[0].engine = engine.value;
    car[0].color = color.value;
    car[0].manufacturer = manufacturer.value;

    carList.push(car[0]);

    storeListOnLocalStorage();

    window.location.href = 'index.html';
}