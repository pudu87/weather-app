const urlStart = 'http://api.openweathermap.org/data/2.5/weather?q=';
const urlEnd = '&appid=30aa43e809e468d20a5ff0a5e98a95ab';
const search = 'London';

async function fetchData(search) {
  try {
    console.log(urlStart + search + urlEnd)
    const response = await fetch(urlStart + search + urlEnd, {mode: 'cors'});
    const data = await response.json();
    console.log(data);
  } catch(error) {
    console.log(error);
  }
}

fetchData(search);
