let searchInp = document.querySelector('.weather__search');
let city = document.querySelector('.weather__city');
let day = document.querySelector('.weather__day');
let humidity = document.querySelector('.weather__indicator--humidity>value');
let wind = document.querySelector('.weather__indicator--wind>value');
let pressure = document.querySelector('.weather__indicator--pressure>value');
let image = document.querySelector('.weather__image');
let temperature = document.querySelector('.weather__temperature');
let weatherAPIkey = '1944e357bf95db531d677b0a98d01c83';
let weatherBaseEnpoint = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}units=metric&appid=' + weatherAPIkey;

let getWeatherByCityName = async (city) => {
    let enpoint = weatherBaseEnpoint + '&q=' + city;
    let response = await fetch(enpoint);
    let weather = await response.json();
    return weather;

}
searchInp.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInp.value);
        console.log(weather);
    }
})

let updateCrrentWeather = (date) => {
    city.textContent = date.name + ', ' + date.sys.country;
    day.textContent = DaysOfWeek();
}
letDaysOfWeek = () => {
    return new Date().toLocaleString('en-EN', { weekday: 'long' });
}