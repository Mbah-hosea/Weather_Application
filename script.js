// ------------------------
// Elements
// ------------------------
const searchBox = document.querySelector('.weather_search');
const cityEl = document.querySelector('.weather_city');
const dayEl = document.querySelector('.weather_day');
const humidityEl = document.querySelector('.weather_indicator--humidity .value');
const windEl = document.querySelector('.weather_indicator--wind .value');
const pressureEl = document.querySelector('.weather_indicator--pressure .value');
const tempEl = document.querySelector('.weather_temparature .value');
const weatherIcon = document.querySelector('.weather_image');
const forecastItems = document.querySelectorAll('.weather_forcast_item');

// ------------------------
// Default cities for autocomplete
// ------------------------
const defaultCities = ["Yaounde", "Paris", "London", "New York", "Tokyo"];

// ------------------------
// Weather images mapping
// ------------------------
const weatherImages = [
    { url: 'images/clear-sky.png', ids: [800] },
    { url: 'images/few-clouds.png', ids: [801] },
    { url: 'images/scattered-clouds.png', ids: [802] },
    { url: 'images/broken-clouds.png', ids: [803, 804] },
    { url: 'images/shower-rain.png', ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321] },
    { url: 'images/rain.png', ids: [500, 501, 502, 503, 504] },
    { url: 'images/thunderstorm.png', ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232] },
    { url: 'images/snow.png', ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622] },
    { url: 'images/mist.png', ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781] }
];

// ------------------------
// API
// ------------------------
const API_KEY = "YOUR_OPENWEATHERMAP_KEY"; // <-- Replace with your key
const WEATHER_URL = https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY};
const FORECAST_URL = https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${API_KEY};

// ------------------------
// Helper functions
// ------------------------
function getDayOfWeek(timestamp = Date.now()) {
    return new Date(timestamp).toLocaleString('en-EN', { weekday: 'long' });
}

function getWindDirection(deg) {
    if (deg >= 45 && deg <= 135) return 'East';
    if (deg > 135 && deg <= 225) return 'South';
    if (deg > 225 && deg <= 315) return 'West';
    return 'North';
}

function selectWeatherImage(id) {
    for (let obj of weatherImages) {
        if (obj.ids.includes(id)) return obj.url;
    }
    return 'images/clear-sky.png';
}

// ------------------------
// Fetch weather data
// ------------------------
async function fetchWeather(city) {
    try {
        const res = await fetch(${WEATHER_URL}&q=${city});
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        updateCurrentWeather(data);
        fetchForecast(data.id);
    } catch (err) {
        alert(err.message);
    }
}

async function fetchForecast(cityId) {
    try {
        const res = await fetch(${FORECAST_URL}&id=${cityId});
        const data = await res.json();

        // Filter 5-day forecast at 12:00
        const daily = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

        daily.forEach((dayData, i) => {
            if (!forecastItems[i]) return;

            const icon = selectWeatherImage(dayData.weather[0].id);
            const dayName = getDayOfWeek(dayData.dt * 1000);
            const temp = dayData.main.temp > 0 ? +${Math.round(dayData.main.temp)} : ${Math.round(dayData.main.temp)};

            forecastItems[i].querySelector('.weather_forcast_icon').src = icon;
            forecastItems[i].querySelector('.wearther_forcast_day').textContent = dayName;
            forecastItems[i].querySelector('.weather_forcast_temparature .value').textContent = temp;
        });
    } catch (err) {
        console.error("Forecast fetch error:", err);
    }
}

// ------------------------
// Update current weather UI
// ------------------------
function updateCurrentWeather(data) {
    cityEl.textContent = ${data.name}, ${data.sys.country};
    dayEl.textContent = getDayOfWeek();
    humidityEl.textContent = data.main.humidity;
    pressureEl.textContent = data.main.pressure;
    windEl.textContent = ${getWindDirection(data.wind.deg)}, ${data.wind.speed};
    tempEl.textContent = data.main.temp > 0 ? +${Math.round(data.main.temp)} : ${Math.round(data.main.temp)};
    weatherIcon.src = selectWeatherImage(data.weather[0].id);
}

// ------------------------
// Autocomplete (local)
searchBox.addEventListener('input', () => {
    const value = searchBox.value.toLowerCase();
    const matches = defaultCities.filter(city => city.toLowerCase().includes(value));
    console.log("Suggestions:", matches); // can later add UI dropdown
});

// ------------------------
// Search event
searchBox.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        fetchWeather(searchBox.value);
    }
});

// ------------------------
// Initialize default city
window.addEventListener('DOMContentLoaded', () => {
    fetchWeather("Yaounde");
});
