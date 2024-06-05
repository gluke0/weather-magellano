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
        <div><span class="weather-icon"> <img src="${urlIcon}" alt="weather icon"> </span></div>
        <div><span class="weather-text"> ${weather} </span></div>`

    // print emoji in html
    let interactiveContent = document.getElementById('emoji');
    interactiveContent.innerHTML = `<span class="emoji">${emoji}</span>`;
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
