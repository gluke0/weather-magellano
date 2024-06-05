// data
let datatoday = new Date()
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };

        let format = datatoday.toLocaleDateString('en-EN', options);
        let result = document.getElementById('datatoday');
        result.innerHTML = `${format}`;
        

// weather api
let key = '642e9d3043cd3d3bbd5061193d8d82c2';
let lat = 45.3142;
let lon = 9.5035;
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;


fetch(url)
  .then(response=>{
    if(!response.ok){
      throw new Error('An error ocurred ' + response.statusText);
    }
    return response.json();
  })
  .then(data =>{
    let temp = data.main.temp.toFixed(1);
    let weather = data.weather[0].description;
    let icon =data.weather[0].icon;
    let sunset = data.sys.sunset;
    let currentTime = Math.floor(Date.now()/1000);

    if (currentTime > sunset){
        icon = icon.replace('d', 'n');
    }
    let urlIcon = `https://openweathermap.org/img/wn/${icon}.png`;
    // keeping console log
    console.log(`The temperature in ${city}, is ${temp}°C`);
    console.log(`The weather conditions are: ${weather}`);
    console.log(`Url icon: ${urlIcon}`);

    // emoji related to temp
    function getEmoji(temp){
        if (temp <= 5){
          return '🥶';
        }else if(temp <= 15){
          return '🤗';
        }else if(temp < 30){
          return '😁';
        } else{
          return '🥵';
        }
      }
    let emoji = getEmoji(temp);

    // print in the html
    let content = document.getElementById('content-dashboard');
    content.innerHTML= 
        `<div><span class="temp"> ${temp}°C </span></div>
        <div><span class="weather-text"> ${weather} </span></div>
        <div><span class="weather-icon"> <img src="${urlIcon}" alt="weather icon"> </span></div>`

    // print emoji in html
    let interactiveContent = document.getElementById('emoji');
    interactiveContent.innerHTML = `<span class="emoji">${emoji}</span>`;
  

    // 3-days forecast
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

  return fetch(urlForecast);
  })
  .then(response =>{
    if (!response.ok){
      throw new Error('An error occurred ' + response.statusText);
    }
    return response.json();
  })
  .then(forecastData => {
    let forecastContent = document.getElementById('forecast-dashboard');
    forecastContent.innerHTML = '';

    let forecastDays = {};
    let currentDate = new Date().getDate();

    forecastData.list.forEach(forecast=>{
      let date = new Date(forecast.dt * 1000);
      let day = date.getDate();
      if (day !== currentDate && Object.keys(forecastDays).length < 3){
        if (!forecastDays[day]){
          forecastDays[day] = [];
        }
        forecastDays[day].push(forecast);
      }
    });

    for (let day in forecastDays){
      let dayForecasts = forecastDays[day];
      let dayTempSum = 0;
      let dayWeather = '';
      let dayIcon = '';
      dayForecasts.forEach(forecast=>{
        dayTempSum += forecast.main.temp;
        dayWeather = forecast.weather[0].description;
        dayIcon = forecast.weather[0].icon;
      });
      let dayTemp = (dayTempSum / dayForecasts.length).toFixed(1);
      let dayUrlIcon = `https://openweathermap.org/img/wn/${dayIcon}.png`;

      forecastContent.innerHTML += `
        <div class="forecast-day">
          <div><span class="forecast-temp"> ${dayTemp}°C </span></div>
          <div><span class="forecast-weather-text"> ${dayWeather} </span></div>
          <div class="threeicon"><span class="forecast-weather-icon"> <img src="${dayUrlIcon}" alt="weather icon"> </span></div>
          <br>
        </div>`;
    }
  })

  .catch(error=>{
    console.error('There was a problem fetching:', error);
  });


// hover for the info box
let trigger = document.getElementById('emoji');
let infoBox = document.getElementById('info-box');

trigger.addEventListener('mouseover',()=>{
  infoBox.classList.remove('loook');
});

trigger.addEventListener('mouseout',()=>{
  infoBox.classList.add('loook');
});