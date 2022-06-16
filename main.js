
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const nameOutput = document.querySelector('.name');
const timeOutput = document.querySelector('.time');
const dateOutput = document.querySelector('.date');
const conditionOutput = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



// Default city name when the page loads
let cityInput = "London"

// Add event listeners to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // Change from default city to clicked one
        cityInput = e.target.innerHTML;
        /* Function fetches and displays all the data
        from the weather API
        */ 
        fetchWeather();
        //Fade out the app (simple animation) 
        app.style.opacity = "0"
    });
})

// Add submit event to the form

form.addEventListener('submit', (e) => {
    /* If input field of the search bar is empty 
    throw alert */ 
    if(search.value.length == 0) {
        alert('please type in a city name');
    } else {
        /*Change from default city to the
        one written in the input field*/
        cityInput = search.value;
        /*Function that fetches and display
        all the data from the weather API */
        fetchWeatherData();
        // Remove all text from the input field
        search.value = "";
        //Fade out the app (simple animation)
        app.style.opacity = "0";
    }

    // Prevents the default bahaviour of the form
    e.preventDefault();
});


/* Function that returns a day of the week
(monday, tuesday....) from a date (12 03 2021)
we will use this function later*/

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    return weekday[new Date(`${day}/${month}/${year}`)];
};

/* Function that fetches and display 
the data from the weather API */ 


function fetchWeatherData() {

    /* Fetch the data and dynamically add 
    the city name with template literals
    USE */ 
    fetch('https://api.weather.com/v1/current.json?key=d4b104af97ee57efd15d5d5b0da86145=${cityInput}')

    /*Take the data (which is in JSON format)
    and convert it to a regular JS object*/ 
    .then(response => response.json())
    .then (data => {

        //console.log data to see what is available
        console.log(data);

        //Adding temperature and weather condition to the page
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        /* Get the date and time from the city and extract the day 
        month, year and time into individual variables */ 
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);
        

        /* Reformat the date into something more apealing and 
        add it to the page */ 
        // original format: 2022-15-06 18:51
        // New format: 18:51 - Wednesday 15, 06 2022
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
        time.timeOutput.innerHTML = time;

        // Add the name of city into the page 
        nameOutput.innerHTML = data.location.name;

        /* Get the corresponding icon url for 
        the weather and extract a part of it*/
        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length);

        /* Reformat the icon url to your own local folder
        path and add it to the page*/
        icon.src = "./icons/" + iconId;

        // Add the weather details to the page
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        // Set default  time of the day
        let timeOfDay = "day";

        // Get the unique id for each weather conition
        const code = data.current.condition.code;

        // Change to night if its night time in the city
        if(!data.current.is_day) {
            timeOfDay = "night"; 
        }

        if(code == 1000) {
            /* Set the background image to clear
            if the weather is clear */ 
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
            /* Change the button bgcolor depending on if 
            its either day or night */ 
            btn.style.background = "#e5ba92"
            if(timeOfDay == night) {
                btn.style.background = "#181e27"
            }
        }

        // same thing for cloudy weather
        else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1035 ||
            code == 1073 ||
            code == 1076 ||
            code == 1079 ||
            code == 1282 

        ) {
            app.style.backgroundImage =
            `url(./images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27"
            }
        // And rain
        } else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 || 
            code == 1204 || 
            code == 1207 || 
            code == 1240 || 
            code == 1243 || 
            code == 1246 || 
            code == 1249 || 
            code == 1252  
        ) {
            app.style.backgroundImage = `
            url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "647d75";
            if(timeOfDay == "night") {
                btn.style.background = "#325c80"
            }
            //  snow
        } else {
            app.style.backgroundImage = `
            url(./images/${timeOfDay}/snowy.jpg)`
            btn.style.background = "#4d72aa"; 
            if(timeOfDay == "night") {
                btn.style.background = "1b1b1b"
            }
        }

        //fade in the page once all is done
        app.style.opacity = "1";
    })
};