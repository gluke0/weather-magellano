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
let city = 'Lodi';
let country = 'IT';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

fetch(url)
  .then(response=>{
    if(!response.ok){
      throw new Error('An error ocurred ' + response.statusText);
    }
    return response.json();
  })
  .then(data =>{
    let temp = data.main.temp;
    let weather = data.weather[0].description;
    // keeping console log
    console.log(`The temperature in ${city}, is ${temp}°C`);
    console.log(`The weather conditions are: ${weather}`);

    // print in the html
    let content = document.getElementById('content-dashboard');
    content.innerHTML= 
        `<div> The temperature in ${city} is ${temp}°C </div>
        <div>The weather conditions are: ${weather}</div>`
  })
  .catch(error=>{
    console.error('There was a problem fetching:', error);
  });
