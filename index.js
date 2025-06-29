const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "fc3e4a9b9ee2992a90b47c6b468e0a95";

weatherForm.addEventListener("submit",async event=>{

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
    
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);
    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}],
           wind:{speed}} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    windDisplay.classList.add("windDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.floor(temp-273.15)}°C`;
    humidityDisplay.textContent = `Humidity : ${humidity}`;
    descDisplay.textContent = description;
    windDisplay.textContent = `Wind Speed : ${speed} Kmph`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(descDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(windDisplay);
}

function getWeatherEmoji(weatherId){
    switch (true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
            break;
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
            break;
        case (weatherId >= 500 && weatherId < 600):
            return "🌦️";
            break;  
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
            break; 
        case (weatherId >= 700 && weatherId < 800):
            return "🍃";
            break;
        case (weatherId === 800):
            return "☀️";
            break;
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
            break;
        default:
            return "❓";
            break;
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    card.textContent = "";
    card.appendChild(errorDisplay)
}