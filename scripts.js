/* Obtener Geolocation */

navigator.geolocation.getCurrentPosition(onSuccessGeolocating,
    onErrorGeolocating, {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000
    });
/* Si se acepta la Geolocalitzación */
function onSuccessGeolocating(position) {
    let coords = [position.coords.latitude, position.coords.longitude]

    /* Api temps openweather*/
    let lat = coords[0];
    let lon = coords[1];

    const apiUrlTemps = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ca&appid=983ebb6b72d33d9f6fb8ee1a83b6206e`;

    getTemps(apiUrlTemps);
}
/* Si no se acepta la Geolocalización */
function onErrorGeolocating(error) {
    /* let coords = [41.3888, 2.159]; //muestra el tiempo de Barcelona
    return coords; */
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('ERROR: Si no activas el acceso a la ubicación no podrás ver el tiempo!');
            break;

        case error.POSITION_UNAVAILABLE:
            alert("ERROR: No podemos acceder a tu ubicación, no podrás ver el tiempo!");
            break;

        case error.TIMEOUT:
            alert("ERROR: Hay mucha demora en ver tu ubicación, no podrás ver el tiempo!");
            break;

        default:
            alert("ERROR: Ni idea que ha pasado, pero no podrás ver que tiempo hace hoy!");
            break;
    }
}
/* Función asíncrona para obtener los datos del tiempo */
async function getTemps(apiUrlTemps) {
    const response = await fetch(apiUrlTemps, {
        method: 'GET',

        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data.weather[0].description);
    document.getElementById("temps").innerHTML = `Avui a ${data.name}: ${data.weather[0].description}`
}

/* Api jokes */
const apiUrlChistes = 'https://icanhazdadjoke.com/';

function nextChiste() {
    getJoke();
}

async function getJoke() {

    const response = await fetch(apiUrlChistes, {
        method: 'GET',

        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data);
    document.getElementById("chiste").innerHTML = data.joke
}