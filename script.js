let cityName = document.querySelector("#place-title");
let locationName = document.querySelector("#place-sub-title");

let weatherCondition = document.querySelector(".weather-condition");

let tempValue = document.querySelector("#temp-value");

let feelsLikeTemp = document.querySelector("#feelsLikeTemp");

let dayHighTemp = document.querySelector("#dayHighTemp");

let dayLowTemp = document.querySelector("#dayLowTemp");

let hourlyWeather = document.querySelector("#hourlyWeather");

const API_KEY = "700653cea56e40ac96245734240807";

getFromSessionStorage();

async function fetchCurrentWeather() {
  try {
    let cityName = "nasik";
    // API Call
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`
    );
    const weatherData = await response.json();
    console.log("Weather data :->", weatherData);
    showCurrentWeather(weatherData);
    showHourlyWeather(weatherData);
  } catch (err) {
    alert("Something went wrong.");
    console.log("An error occured");
  }
}

async function getCustomWeatherDets(userCoordinates) {
  const { lat, long } = userCoordinates;
    try {
      
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${long}`
    );
        let weatherData = await response.json();
        showCurrentWeather(weatherData);
        showHourlyWeather(weatherData);
    console.log(data);
  } catch (err) {
    console.log("An error occurred", err);
    }
    
}


// Current Location

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geolocation support");
  }
}

// function get from Session Storage

function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinate");
    if (localCoordinates) {
        let coordinates = JSON.parse(localCoordinates);
        getCustomWeatherDets(coordinates);
    }
    else {
        alert("Location not found.");
    }
}
function showPosition(position) {
  const coordinates = {
    lat: position.coords.latitide,
    long: position.coords.longitude,
  };
  sessionStorage.setItem("user-coordinate", JSON.stringify(coordinates));
  getCustomWeatherDets(coordinates);
}

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-SearchWeather]");

function showCurrentWeather(weatherData) {
  cityName.textContent = weatherData?.location?.name;

  locationName.textContent = `${weatherData?.location?.region},${weatherData?.location?.country}`;

  weatherCondition.textContent = weatherData?.current?.condition?.text;

  tempValue.innerHTML = `${Math.floor(weatherData?.current?.temp_c)}&degC`;

  feelsLikeTemp.innerHTML = `${Math.floor(
    weatherData?.current?.feelslike_c
  )}&degC`;

  dayHighTemp.innerHTML = `${Math.floor(
    weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c
  )}&degC`;

  dayLowTemp.innerHTML = `${Math.floor(
    weatherData?.forecast?.forecastday[0]?.day?.mintemp_c
  )}&degC`;
}

function showHourlyWeather(weatherData) {
  for (let i = 0; i < 24; i++) {
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time");
    const timePara = document.createElement("p");
    let time =
      weatherData?.forecast?.forecastday[0]?.hour[i]?.time.split(" ")[1];

    let currentTime = "";
    if (time.split(":")[0] >= 0 && time.split(":")[0] <= 11) {
      currentTime = `${time}AM`;
    } else if (time.split(":")[0] == 12) {
      currentTime = `12:00PM`;
    } else {
      currentTime = `${time.split(":")[0] - 12}:00PM`;
    }

    timePara.textContent = currentTime;
    timeDiv.appendChild(timePara);
    detailsDiv.appendChild(timeDiv);

    // temp div
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("tem");
    const tempPara = document.createElement("p");
    tempPara.innerHTML = `${Math.floor(
      weatherData?.forecast?.forecastday[0]?.hour[i]?.temp_c
    )}&degC`;

    tempDiv.appendChild(tempPara);
    detailsDiv.appendChild(tempDiv);

    // Humidity

    const humidDiv = document.createElement("div");
    humidDiv.classList.add("humidity");
    const humidPara = document.createElement("p");
    humidPara.innerHTML = `${weatherData?.forecast?.forecastday[0]?.hour[i]?.humidity}%`;
    humidDiv.appendChild(humidPara);
    detailsDiv.appendChild(humidDiv);

    //image

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image2");

    const imageTag = document.createElement("img");
    imageTag.src = `${weatherData?.forecast?.forecastday[0]?.hour[0]?.condition?.icon}`;
    imageDiv.appendChild(imageTag);
    detailsDiv.appendChild(imageDiv);

    hourlyWeather.appendChild(detailsDiv);
  }
}


let a = 10;
let b = 20;

function sum(x,y) {
   let  a = x;
    let b = y;
    let c = a + b;
}
sum(a,b);
