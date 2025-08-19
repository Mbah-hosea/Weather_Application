let searchInp = document.querySelector('.weather__search');
let city = document.querySelector('.weather__city');
let day = document.querySelector('.weather__day');
let humidity = document.querySelector('.weather__indicator--humidity>value');
let wind = document.querySelector('.weather__indicator--wind>value');
let pressure = document.querySelector('.weather__indicator--pressure>value');
let image = document.querySelector('.weather__image');
let temperature = document.querySelector('.weather__temperature');
let forcastBlock = document.querySelector('.weather__forcast');
let suggestions = document.querySelector('#suggestions');
let weatherAPIkey = '1944e357bf95db531d677b0a98d01c83';
let weatherBaseEnpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIkey;
let forcastBaseEnpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherAPIkey;
let cityBaseEnpoint='https://api.teleport.org/api/cities/?search=';
let weatherImages= [
{
    url:'images/clear-sky.png',
    ids: [800]
},
{
    url:'images/broken-clouds.png',
    ids: [803, 804]
},
{
    url:'images/few-clouds.png',
    ids: [801]
},
{
    url:'images/mist.png',
    ids: [701, 711, 721, 731, 741, 751, 761,762,771,781]
},
{
    url:'images/rain.png',
    ids: [500, 501, 502, 503, 504]
},
{
    url:'images/scattered-clouds.png',
    ids: [802]
},
{
    url:'images/shower-rain.png',
    ids: [520, 521, 522, 531,300, 301, 302, 310, 311, 312, 313, 314, 321]
},
{
    url:'images/snow.png',
    ids: [511,600, 601, 602, 611, 612,613, 615, 616, 620, 621, 622]
},
{
    url:'images/thunderstorm.png',
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
}
];




let getWeatherByCityName = async (cityString) => {
    if(cityString.includes(',')) {
        city=cityString.substring(0, cityString.indexOf(','))+cityString.substring(cityString.lastindexOf(','));
    }else{city = cityString;}
    let enpoint = weatherBaseEnpoint + '&q=' + city;
    if(response.status !== 200) {
        alert('City not found!');
        return;

    let response = await fetch(enpoint);
    let weather = await response.json();
    console.log(weather);
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
}
weatheForCity=async(city) => {
     let weather = await getWeatherByCityName(searchInp.value);
        if (!weather) {
            return;
        }
    }
        updateCurrentWeather(weather);
       let forcast= await getForcastByCityID(cityID);
       updateForcast(forcast);
let init=() => {
    weatherForCity('Yaounde').then(()=>document.body.style.filter = 'blur(0px)');
    init();
}

searchInp.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        weatherForCity(searchInp.value);
        let weather = await getWeatherByCityName(searchInp.value);
        if (!weather) {
            return;
        }
        updateCurrentWeather(weather);
       let forcast= await getForcastByCityID(cityID);
       updateForcast(forcast);
    }
})

searchInp.addEventListener('input', () => {
    let enpoint = cityBaseEnpoint + searchInp.value;
    let result= await (await fetch(searchInp.value)).json();
    suggestions.innerHTML = '';
    result._embedded['city:search-results'];
    let length = cities.length > 5 ? 5 : cities.length;
    for (let i = 0; i < length; i++) {
        let city = cities[i].matching_full_name;
        let option = document.createElement('option');
        option.value = cities[i].matching_full_name;
        suggestions.appendChild(option);
    }

});
    

let updateCurrentWeather = (date) => {
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
let imgID= date.weather[0].id;
weatherImages.forEach(obj=> {
    if (obj.ids.includes(imgID)) {
        image.src = obj.url;
    }
});
let updateForcast = (forcast) => {
    forcastBlock.innerHTML = '';
}
forcast.forEach(day => {
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
