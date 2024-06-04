const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
async function fetchWeatherDets() {
    try {
        
        let city = "nashik";
        // API Call
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log("Weather data :->", data);
    
        let newPara = document.querySelector('.temp-value');
        newPara.textContent  = `${data?.main?.temp.toFixed(2)} °C`;
    }
    catch(err) {
        console.log("An error occured");
    }
        
} 

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

    
