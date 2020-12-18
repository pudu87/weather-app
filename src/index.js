const urlStart = 'http://api.openweathermap.org/data/2.5/weather?q=';
const urlEnd = '&appid=30aa43e809e468d20a5ff0a5e98a95ab';
const search = 'London';

async function fetchData(search) {
  try {
    console.log(urlStart + search + urlEnd)
    const response = await fetch(urlStart + search + urlEnd, {mode: 'cors'});
    const dataSet = await response.json();
    console.log(dataSet);
    console.log(processData(dataSet))
  } catch(error) {
    console.log(error);
  }
}

function processData(data) {
  const day = data.sys.sunrise < data.dt && data.dt < data.sys.sunset;
  const requiredData = { 
    weather: data.weather[0].main,
    temp: data.main.temp, 
    pressure: data.main.pressure, 
    humidity: data.main.humidity, 
    wind: data.wind.deg,
    day
  }
  return requiredData
}

fetchData(search);
