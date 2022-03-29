const colors = document.querySelector('.colors');

const brands = document.querySelector('.brands');

const cars = document.querySelector('.cars');

const show = document.querySelector('.show');

const templateElem = document.querySelector('.carInfo').innerHTML

const carsTemplate = Handlebars.compile(templateElem)

const templateAllCars = document.querySelector('.allCars').innerHTML

const allCars = Handlebars.compile(templateAllCars)

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