let cityName = document.querySelector('#place-title');
let locationName = document.querySelector('#place-sub-title');

let weatherCondition = document.querySelector('.weather-condition')

let tempValue = document.querySelector('#temp-value');

let feelsLikeTemp = document.querySelector('#feelsLikeTemp');

let dayHighTemp = document.querySelector('#dayHighTemp')


let dayLowTemp = document.querySelector('#dayLowTemp');


const API_KEY = "700653cea56e40ac96245734240807";
async function fetchCurrentWeather() {
    try {
        
        let cityName = "bhopal";
        // API Call
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`);
        const weatherData = await response.json();
        console.log("Weather data :->",  weatherData);
        showCurrentWeather( weatherData);
    
    }
    catch (err) {
        alert("Something went wrong.");
        console.log("An error occured");
    }

        
} 

fetchCurrentWeather();

async function getCustomWeatherDets() {
    try {
        
        let latitude = 42.444;
        let longitude = 42.444;
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        let data = await result.json();
        console.log(data);
    }
    catch (err) {
        console.log("An error occurred",err);
    }
}




// Current Location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("No geolocation support");
    }
}
function showPosition(position) {
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;
    console.log(lat);
    console.log(longi);

}



const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-SearchWeather]");

    
function showCurrentWeather(weatherData) { 
    cityName.textContent = weatherData?.location?.name;

    locationName.textContent = `${weatherData?.location?.region},${weatherData?.location?.country}`;

    weatherCondition.textContent = weatherData?.current?.condition?.text;

    tempValue.innerHTML = `${Math.floor(weatherData?.current?.temp_c)}&degC`;

    feelsLikeTemp.innerHTML = `${Math.floor(weatherData?.current?.feelslike_c)}&degC`;
    
    dayHighTemp.innerHTML = `${Math.floor(weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c)}&degC`;


    dayLowTemp.innerHTML = `${Math.floor(weatherData?.forecast?.forecastday[0]?.day?.mintemp_c)}&degC`;

}


