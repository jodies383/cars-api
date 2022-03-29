var colors = document.querySelector('.colors');

var brands = document.querySelector('.brands');

var cars = document.querySelector('.cars');

var show = document.querySelector('.show');

var templateElem = document.querySelector('.carInfo').innerHTML

var carsTemplate = Handlebars.compile(templateElem)

var templateAllCars = document.querySelector('.allCars').innerHTML

var allCars = Handlebars.compile(templateAllCars)

axios
.get('https://api-tutor.herokuapp.com/v1/colors')
.then(function (result) {
    colors.innerHTML = carsTemplate({
        info: result.data
    });
})

axios
.get('https://api-tutor.herokuapp.com/v1/makes')
.then(function (result) {
    brands.innerHTML = carsTemplate({
        info: result.data
    });
})

axios
.get('https://api-tutor.herokuapp.com/v1/cars')
.then(function (result) {
    cars.innerHTML = allCars({
        car: result.data
    });
})
show.addEventListener('click', filter);

function filter() {
    var carColor = document.getElementById("carColor").value;
    var carBrand = document.getElementById("carBrand").value;

    if (carColor && carBrand) {

        axios
            .get(`https://api-tutor.herokuapp.com/v1/cars/make/${carBrand}/color/${carColor}`)
            .then(function (result) {
                cars.innerHTML = allCars({
                    car: result.data
                });

            })
    }
    else if (carColor) {
        axios
            .get(`https://api-tutor.herokuapp.com/v1/cars/color/${carColor}`)
            .then(function (result) {
                cars.innerHTML = allCars({
                    car: result.data
                });

            })
    } else if (carBrand) {
        axios
            .get(`https://api-tutor.herokuapp.com/v1/cars/make/${carBrand}`)
            .then(function (result) {
                cars.innerHTML = allCars({
                    car: result.data
                });

            })
    } else {
        axios
            .get('https://api-tutor.herokuapp.com/v1/cars')
            .then(function (result) {
                cars.innerHTML = allCars({
                    car: result.data
                });
            })
    }

}