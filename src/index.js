const search = document.querySelector('#location');
const form = document.querySelector('form');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp span');
const windDir = document.querySelector('.arrow');
const windSpeed = document.querySelector('.speed')
const weather = document.querySelector('.weather img');
const pressure = document.querySelector('.pressure span');
const humidity = document.querySelector('.humidity span');
const urlStart = 'http://api.openweathermap.org/data/2.5/weather?q=';
const urlEnd = '&appid=30aa43e809e468d20a5ff0a5e98a95ab';

function displayLocation(e) {
  e.preventDefault();
  const location = search.value.replace(/\s+/g, '');
  fetchData(location);
}

async function fetchData(search) {
  try {
    const response = await fetch(urlStart + search + urlEnd, {mode: 'cors'});
    const dataSet = await response.json();
    const data = processData(dataSet);
    displayData(data);
    console.log(dataSet);
    console.log(processData(dataSet));
  } catch(error) {
    console.log(error);
  }
}

function processData(data) {
  const day = data.sys.sunrise < data.dt && data.dt < data.sys.sunset;
  const requiredData = {
    name: data.name, 
    temp: data.main.temp, 
    windDir: data.wind.deg,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    pressure: data.main.pressure, 
    humidity: data.main.humidity, 
    day
  }
  return requiredData
}

function displayData(data) {
  city.textContent = data.name;
  const tempC = Math.round(data.temp - 273.15);
  temp.textContent = `${tempC} °C`;
  windDir.style.rotate = `${data.windDir - 180}deg`;
  windSpeed.textContent = `${data.windSpeed} m/s`
  weather.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
  pressure.textContent = `${data.pressure} hPa`;
  humidity.textContent = `${data.humidity} %`;
}

fetchData('Santiago');
form.addEventListener('submit', displayLocation);
