let searchBTN = document.querySelector("#search");
let cityInput = document.querySelector("#cityInp");
let stateInput = document.querySelector("#stateInp");
let mainContent = document.querySelector("#main");

let resetBTN = document.querySelector("#reset");

resetBTN.addEventListener('click', () =>{
    mainContent.classList.add("Hide");
    cityInput.value = '';
    stateInput.value = '';
})

searchBTN.addEventListener('click', () => {
    mainContent.classList.remove("Hide");
    let city = cityInput.value;
    let state = stateInput.value;
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${city},${state}&iconSet=icons1&aggregateHours=24&forecastDays=5&unitGroup=us&shortColumnNames=false&contentType=json&key=95VXDF2FPLW35MCG9BJ7VZ6WC`, {
  method: 'GET', 
  headers: { },
}).then((response) => response.json())
.then((data) => {

    error.classList.add("Hide");
    let city = cityInput.value;
    let selectedCity = document.querySelector("#selectedCity");
    let actualTemp = document.querySelector("#actualTemp");
    let currentlyFeels = document.querySelector("#currentlyFeels");
    
    selectedCity.innerText = city + "'s Current Weather";
    actualTemp.innerText = "Temprature " + data.locations[Object.keys(data.locations)].currentConditions.temp + "°F";
    let wind = data.locations[Object.keys(data.locations)].currentConditions.windchill;

    if(!wind === null){
        currentlyFeels.innerText = "Feels Like " + wind + "°F";
    } else{
        currentlyFeels.innerText = "Feels Like " + data.locations[Object.keys(data.locations)].values[0].temp + "°F";
    }

    let weather = document.querySelector("#weather");
    weather.innerText = data.locations[Object.keys(data.locations)].values[0].conditions;

    let dates = document.querySelectorAll(".date");
    let highs = document.querySelectorAll(".high");
    let lows = document.querySelectorAll(".low");
    let feels = document.querySelectorAll(".feels");
    let temps = document.querySelectorAll(".temp");
    let days = document.querySelectorAll(".day");


    for(let i = 0; i < data.locations[Object.keys(data.locations)].values.length; i++){
        let date = (data.locations[Object.keys(data.locations)].values[i].datetimeStr);
        let newDate = date.substring(0,10);
        dates[i].innerText = newDate;

        let high = (data.locations[Object.keys(data.locations)].values[i].maxt);
        highs[i].innerText = "High: " + high + "°F";

        let low = (data.locations[Object.keys(data.locations)].values[i].mint);
        lows[i].innerText = "Low: " + low + "°F";

        let feel = (data.locations[Object.keys(data.locations)].values[i].windchill);
        if(!feel === null){
            feels[i].innerText = "Feels like: " + feel + "°F";
        }
        else{
            let temp = (data.locations[Object.keys(data.locations)].values[i].temp);
            feels[i].innerText = "Feels like: " + temp + "°F";
        }
        
        let temp = (data.locations[Object.keys(data.locations)].values[i].temp);
        let condition = (data.locations[Object.keys(data.locations)].values[i].conditions);
        temps[i].innerText = condition + " and " + temp + "°F";

        let day = (data.locations[Object.keys(data.locations)].values[i].datetimeStr);
        let newday = getDayName(day, "en-US");
        days[i].innerText = newday;
    }

    let validIconNames = ["rain", "wind", "fog", "snow", "partly-cloudy-day", "partly-cloudy-night", "clear-day", "clear-night"];

    for (let i = 0; i < data.locations[Object.keys(data.locations)].values.length; i++) {
        let day = document.querySelector(`#day${i + 1}`);
        let icon = (data.locations[Object.keys(data.locations)].values[i].icon);

        if (validIconNames.includes(icon)) {
            day.src = `${icon}.png`;
        } else {
            day.src = "partly-cloudy-day.png";
        }

    }

})
.catch(() => {
    let error = document.querySelector("#error");
    mainContent.classList.add("Hide");
    error.classList.remove("Hide");
});
})

function getDayName(dateStr, local){
    var date = new Date(dateStr);
    return date.toLocaleDateString(local, {weekday: 'long'});
}