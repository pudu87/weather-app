(()=>{const e="http://api.openweathermap.org/data/2.5/weather?q=",a="&appid=30aa43e809e468d20a5ff0a5e98a95ab";!async function(n){try{console.log(e+n+a);const t=await fetch(e+n+a,{mode:"cors"}),o=await t.json();console.log(o),console.log(function(e){const a=e.sys.sunrise<e.dt&&e.dt<e.sys.sunset;return{weather:e.weather[0].main,temp:e.main.temp,pressure:e.main.pressure,humidity:e.main.humidity,wind:e.wind.deg,day:a}}(o))}catch(e){console.log(e)}}("London")})();