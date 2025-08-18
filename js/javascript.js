let searchInp = document.querySelector('.weather__search');
let city = document.querySelector('.weather__city');
let day = document.querySelector('.weather__day');
let humidity = document.querySelector('.weather__indicator--humidity>value');
let wind = document.querySelector('.weather__indicator--wind>value');
let pressure = document.querySelector('.weather__indicator--pressure>value');
let image = document.querySelector('.weather__image');
let temperature = document.querySelector('.weather__temperature');
let forcastBlock = document.querySelector('.weather__forcast');
let weatherAPIkey = '1944e357bf95db531d677b0a98d01c83';
let weatherBaseEnpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIkey;
let forcastBaseEnpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherAPIkey;

let getWeatherByCityName = async (city) => {
    let enpoint = weatherBaseEnpoint + '&q=' + city;
    let response = await fetch(enpoint);
    let weather = await response.json();
    return weather;
}

let getForcastByCityID = async (id) => {
    let enpoint = forcastBaseEnpoint + '&id=' + id;
    let result = await fetch(enpoint);
    let forcast = await result.json();
    let forcastList = forcast.list;
    let daily = [];
}

forcastList.forEach((day) => {
    let date = new Date(day.dt.replace(' ', 'T'));
    let hours = date.getHours();
    if (hours === 12) {
        daily.push(day);
    }
});
return daily;

searchInp.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInp.value);
        updateCurrentWeather(weather);
       let forcast= await getForcastByCityID(cityID);
       updateForcast(forcast);
    }
})



let updateCurrentWeather = (date) => {
    console.log(date);
    city.textContent = date.name + ', ' + date.sys.country;
    day.textContent = DaysOfWeek();
    humidity.textContent = date.main.humidity;
    pressure.textContent = date.main.pressure;
    let windDirection;
    let deg = date.wind.deg;
    if (deg >= 45 && deg <= 135) {
        windDirection = 'East';
    } else if (deg > 135 && deg <= 225) {
        windDirection = 'South';
    } else if (deg > 225 && deg <= 315) {
        windDirection = 'West';
    } else {
        windDirection = 'North';
    }
    wind.textContent = windDirection + ' ' + date.wind.speed;
    temperature.textContent = data.main.temp > 0 ?
        '+' + Math.round(data.main.temp) : date.main.temp;
    math.round(data.main.temp);
}
let updateForcast = (forcast) => {
    forcastBlock.innerHTML = '';
}
forcast.forEach((day) => {
        let iconURL = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
        letdayyName=daysOfWeek(day.dt * 1000)
        let temperature = day.main.temp > 0 ?
            '+' + Math.round(day.main.temp) : date.main.temp;
        math.round(days.main.temp);
         let forcastItem = 
            < article class="weather_forcast_item">
                <img src="${iconUrl}" alt="${day.weather[0].discription}" class="weather_forcast_icon">
                    <h3 class="wearther_forcast_day">${Day}</h3>
                    <p class="weather_forcast_temparature"><span class="value">${temperature}</span>&deg;</p>
                </article>
        ;
        forcastBlock.insertAdjacentHTML('beforeend', forcastItem);
})    
    


letDaysOfWeek = (dt = new Date().getTime) => {
    return new Date().toLocaleString('en-EN', { weekday: 'long' });
}
