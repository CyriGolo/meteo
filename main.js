const input = document.querySelector('#city');
const apiKey = 'your key';
const result = document.querySelector('#result');
const prevision = document.querySelector('#prev')

input.addEventListener('keypress', function(key){
  if(key.key == "Enter") {
    if(!input.value) {
      alert('Please enter a city.')
      return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&lang=${"fr"}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&lang=${"fr"}&units=metric`;
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data =>{
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      console.error('Error fetching current weather data. Please try again.');
    })


    fetch(forecastUrl)
    .then(response => response.json())
    .then(data =>{
      displayHourlyForecast(data.list);
    })
    .catch(error => {
      console.error('Error fetching hourly forecast data:', error);
      console.error('Error fetching hourly forecast data. Please try again.');
    })
  }
})

function displayWeather(data){
  result.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">
  <h2>${Math.round(data.main.temp)}°C</h2>
  <p>${data.weather[0].description}</p>
  <p>${data.name}</p>
  <div class="suns">
    <div class="sun">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17h1m16 0h1M5.6 10.6l.7.7m12.1-.7l-.7.7M8 17a4 4 0 0 1 8 0M3 21h18M12 9V3l3 3M9 6l3-3"/></svg>
      <p>${("0" + (new Date(data.sys.sunrise*1000).getHours())).slice(-2)}:${("0" + (new Date(data.sys.sunrise*1000).getMinutes())).slice(-2)}</p>
    </div>
    <div class="sun">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17h1m16 0h1M5.6 10.6l.7.7m12.1-.7l-.7.7M8 17a4 4 0 0 1 8 0M3 21h18M12 3v6l3-3M9 6l3 3"/></svg>
      <p>${("0" + (new Date(data.sys.sunset*1000).getHours())).slice(-2)}:${("0" + (new Date(data.sys.sunset*1000).getMinutes())).slice(-2)}</p>
    </div>
  </div>`;
}

function displayHourlyForecast(hourlyData) {
  prevision.innerHTML='';

  hourlyData.slice(0, 8).forEach(item => {
    let classPrev = "prevs";
    if(new Date().getHours() > new Date(item.dt * 1000).getHours()) {
      classPrev += " oldDate";
    }
    prevision.innerHTML += `
    <div class="${classPrev}">
      <span>${new Date(item.dt * 1000).getHours()}:00</span>
      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">
      <span>${Math.round(item.main.temp)}°C</span>
    </div>`
  });
  input.value = ""
  input.blur();
}
