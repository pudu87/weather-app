const search = document.querySelector('#location');
const form = document.querySelector('form');
const city = document.querySelector('.city');
const tempQuantity = document.querySelector('.temp-quantity');
const tempUnit = document.querySelector('.temp-unit');
const tempSwitch = document.querySelector('.temp-switch');
const windDir = document.querySelector('.arrow');
const windSpeed = document.querySelector('.speed')
const weather = document.querySelector('.weather img');
const pressure = document.querySelector('.pressure span');
const humidity = document.querySelector('.humidity span');
const dataDisplay = document.querySelector('#data')
const loadingDisplay = document.querySelector('#loading');
const urlStart = 'https://api.openweathermap.org/data/2.5/weather?q=';
const urlEnd = '&appid=30aa43e809e468d20a5ff0a5e98a95ab';

const data = {};

function displayLocation(e) {
  e.preventDefault();
  const location = search.value.replace(/\s+/g, '+');
  fetchData(location);
}

function toggleLoading() {
  dataDisplay.classList.toggle('hidden');
  loadingDisplay.classList.toggle('hidden');
}

async function fetchData(search) {
  try {
    toggleLoading();
    // Timeout is to show off the loading component...
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await fetch(urlStart + search + urlEnd, {mode: 'cors'});
    const dataSet = await response.json();
    const data = processData(dataSet);
    displayData();
  } catch(error) {
    console.log(error);
  }
}

function processData(dataSet) {
  const day = dataSet.sys.sunrise < dataSet.dt && dataSet.dt < dataSet.sys.sunset;
  data.name = dataSet.name;
  data.temp = dataSet.main.temp; 
  data.windDir = dataSet.wind.deg;
  data.windSpeed = dataSet.wind.speed;
  data.icon = dataSet.weather[0].icon;
  data.pressure = dataSet.main.pressure; 
  data.humidity = dataSet.main.humidity; 
  data.day = day;
}

function displayData() {
  city.textContent = data.name;
  switchTemp(data.temp);
  switchTemp(data.temp);
  windDir.style.rotate = `${data.windDir - 180}deg`;
  windSpeed.textContent = `${data.windSpeed} m/s`
  weather.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  pressure.textContent = `${data.pressure} hPa`;
  humidity.textContent = `${data.humidity} %`;
  toggleLoading();
}

function switchTemp() {
  if (tempUnit.textContent === '°C') {
    tempQuantity.textContent = Math.round((data.temp - 273.15) * 9 / 5 + 32);
    tempUnit.textContent = '°K';
  } else {
    tempQuantity.textContent = Math.round(data.temp - 273.15);
    tempUnit.textContent = '°C';
  }
}

fetchData('Santiago');
form.addEventListener('submit', displayLocation);
tempSwitch.addEventListener('click', switchTemp);
