// =============================
// WeatherPro
// =============================

const API_KEY = "b6857bfcdd124b288f5111308260308";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const uv = document.getElementById("uv");
const country = document.getElementById("country");

// =============================
// Fetch Weather
// =============================

async function getWeather(cityName) {

    try {

        searchBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i>';

        const url =
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=yes`;

        const response = await fetch(url);

        const data = await response.json();

        if (data.error) {

            alert(data.error.message);

            searchBtn.innerHTML =
            '<i class="fa-solid fa-magnifying-glass"></i>';

            return;
        }

        updateUI(data);

    } catch (error) {

        alert("Unable to fetch weather.");

        console.log(error);

    }

    searchBtn.innerHTML =
    '<i class="fa-solid fa-magnifying-glass"></i>';
}

// =============================
// Update UI
// =============================

function updateUI(data){

    city.innerText =
    data.location.name;

    country.innerText =
    data.location.country;

    temp.innerText =
    Math.round(data.current.temp_c) + "°C";

    condition.innerText =
    data.current.condition.text;

    feelsLike.innerText =
    Math.round(data.current.feelslike_c) + "°C";

    humidity.innerText =
    data.current.humidity + "%";

    wind.innerText =
    data.current.wind_kph + " km/h";

    visibility.innerText =
    data.current.vis_km + " km";

    uv.innerText =
    data.current.uv;

    weatherIcon.src =
    "https:" + data.current.condition.icon;

    changeBackground(data.current.condition.text);
}

// =============================
// Backgrounds
// =============================

function changeBackground(weather){

    weather = weather.toLowerCase();

    if(weather.includes("sun")){

        document.body.style.background =
        "linear-gradient(135deg,#FDB813,#FF7E5F)";

    }

    else if(weather.includes("cloud")){

        document.body.style.background =
        "linear-gradient(135deg,#5B86E5,#36D1DC)";

    }

    else if(weather.includes("rain")){

        document.body.style.background =
        "linear-gradient(135deg,#2C3E50,#4CA1AF)";

    }

    else if(weather.includes("snow")){

        document.body.style.background =
        "linear-gradient(135deg,#E6DADA,#274046)";

    }

    else if(weather.includes("storm")){

        document.body.style.background =
        "linear-gradient(135deg,#141E30,#243B55)";

    }

    else{

        document.body.style.background =
        "linear-gradient(135deg,#0F172A,#2563EB)";
    }

}

// =============================
// Search
// =============================

searchBtn.addEventListener("click",()=>{

    if(cityInput.value.trim() !== ""){

        getWeather(cityInput.value);

    }

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        getWeather(cityInput.value);

    }

});

// =============================
// Current Location
// =============================

function currentLocation(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>{

            const lat = position.coords.latitude;

            const lon = position.coords.longitude;

            getWeather(`${lat},${lon}`);

        });

    }

}

// =============================
// Load Default
// =============================

currentLocation();