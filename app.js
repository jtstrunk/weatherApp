let searchBTN = document.querySelector("#search");
let cityInput = document.querySelector("#cityInp");
let stateInput = document.querySelector("#stateInp");
let mainContent = document.querySelector("#main");

let resetBTN = document.querySelector("#reset");

resetBTN.addEventListener('click', function(){
    mainContent.classList.add("Hide");
    cityInput.value = '';
    stateInput.value = '';
})

searchBTN.addEventListener('click', function() {
    mainContent.classList.remove("Hide");
    let city = cityInput.value;
    console.log(city);
    let state = stateInput.value;
    console.log(state);

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${city},${state}&iconSet=icons1&aggregateHours=24&forecastDays=5&unitGroup=us&shortColumnNames=false&contentType=json&key=95VXDF2FPLW35MCG9BJ7VZ6WC`, {
  method: 'GET', 
  headers: { },
}).then((response) => response.json())
.then((data) => {
    console.log(data)
    //let str = JSON.parse(data);
    //console.log(data.locations[Object.keys(data.locations)].id);
    //console.log(data.locations[Object.keys(data.locations)].currentConditions);
    //console.log(data.locations[Object.keys(data.locations)].currentConditions.datetime);
    //console.log(data.locations[Object.keys(data.locations)].currentConditions.temp);
    //console.log(data.locations[Object.keys(data.locations)].currentConditions.temp);

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

    for(let i = 0; i < data.locations[Object.keys(data.locations)].values.length; i++){
        let date = (data.locations[Object.keys(data.locations)].values[i].datetimeStr);
        let newDate = date.substring(0,10);
        dates[i].innerText = newDate;
    }

    let highs = document.querySelectorAll(".high");

    for(let i =0; i< data.locations[Object.keys(data.locations)].values.length; i++){
        let high = (data.locations[Object.keys(data.locations)].values[i].maxt);
        highs[i].innerText = "High: " + high + "°F";
        console.log("new high");
    }

    let lows = document.querySelectorAll(".low");

    for(let i =0; i< data.locations[Object.keys(data.locations)].values.length; i++){
        let low = (data.locations[Object.keys(data.locations)].values[i].mint);
        lows[i].innerText = "Low: " + low + "°F";
        console.log("new low");
    }

    let feels = document.querySelectorAll(".feels");

    for(let i = 0; i < data.locations[Object.keys(data.locations)].values.length; i++){
        let feel = (data.locations[Object.keys(data.locations)].values[i].windchill);
        if(!feel === null){
            feels[i].innerText = "Feels like: " + feel + "°F";
        }
        else{
            let temp = (data.locations[Object.keys(data.locations)].values[i].temp);
            feels[i].innerText = "Feels like: " + temp + "°F";
        }
        
    }

    let temps = document.querySelectorAll(".temp");

    for(let i = 0; i < data.locations[Object.keys(data.locations)].values.length; i++){
        let temp = (data.locations[Object.keys(data.locations)].values[i].temp);
        let condition = (data.locations[Object.keys(data.locations)].values[i].conditions);
        temps[i].innerText = condition + " and " + temp + "°F";
    }

    let days = document.querySelectorAll(".day");

    for(let i = 0; i < data.locations[Object.keys(data.locations)].values.length; i++){
        let day = (data.locations[Object.keys(data.locations)].values[i].datetimeStr);
        let newday = getDayName(day, "en-US");
        days[i].innerText = newday;
    }

    let icon = (data.locations[Object.keys(data.locations)].values[0].icon);
    let day1 = document.querySelector("#day1");
    let day2 = document.querySelector("#day2");
    let day3 = document.querySelector("#day3");
    let day4 = document.querySelector("#day4");
    let day5 = document.querySelector("#day5");

    //I am aware this is not the best way to do this. Below it is the way I was 
    //trying and plan to come back to it. I wanted to make everything work together before it was perfect

    if(icon == "rain"){
        day1.src = "rain.png";
        console.log("rain");
    } else if(icon == "wind"){
        day1.src = "wind.png";
        console.log("wind");
    } else if(icon == "cloudy"){
        day1.src = "cloudy.png";
        console.log("clouds");
    } else if(icon == "fog") {
        day1.src = "fog.png";
        console.log("fog");
    } else if(icon == "snow"){
        day1.src = "snow.png";
        console.log("snow");
    } else if(icon == "partly-cloudy-day"){
        day1.src = "partly-cloudy-day.png";
        console.log("partly cloudy day");
    } else if(icon == "partly-cloudy-night"){
        day1.src = "partly-cloudy-night.png";
        console.log("partly cloudly night");
    } else if(icon == "clear-day"){
        day1.src = "clear-day.png";
        console.log("clear day");
    } else if(icon == "clear-night"){
        day1.src = "clear-night.png";
        console.log("clear night");
    } else {
        day1.src = "clear-day.png";
        console.log("default");
    }
    
    icon = (data.locations[Object.keys(data.locations)].values[1].icon);
    if(icon == "rain"){
        day2.src = "rain.png";
        console.log("rain");
    } else if(icon == "wind"){
        day2.src = "wind.png";
        console.log("wind");
    } else if(icon == "cloudy"){
        day2.src = "cloudy.png";
        console.log("clouds");
    } else if(icon == "fog") {
        day2.src = "fog.png";
        console.log("fog");
    } else if(icon == "snow"){
        day2.src = "snow.png";
        console.log("snow");
    } else if(icon == "partly-cloudy-day"){
        day2.src = "partly-cloudy-day.png";
        console.log("partly cloudy day");
    } else if(icon == "partly-cloudy-night"){
        day2.src = "partly-cloudy-night.png";
        console.log("partly cloudly night");
    } else if(icon == "clear-day"){
        day2.src = "clear-day.png";
        console.log("clear day");
    } else if(icon == "clear-night"){
        day2.src = "clear-night.png";
        console.log("clear night");
    } else {
        day2.src = "clear-day.png";
        console.log("default");
    }

    icon = (data.locations[Object.keys(data.locations)].values[2].icon);
    if(icon == "rain"){
        day3.src = "rain.png";
        console.log("rain");
    } else if(icon == "wind"){
        day3.src = "wind.png";
        console.log("wind");
    } else if(icon == "cloudy"){
        day3.src = "cloudy.png";
        console.log("clouds");
    } else if(icon == "fog") {
        day3.src = "fog.png";
        console.log("fog");
    } else if(icon == "snow"){
        day3.src = "snow.png";
        console.log("snow");
    } else if(icon == "partly-cloudy-day"){
        day3.src = "partly-cloudy-day.png";
        console.log("partly cloudy day");
    } else if(icon == "partly-cloudy-night"){
        day3.src = "partly-cloudy-night.png";
        console.log("partly cloudly night");
    } else if(icon == "clear-day"){
        day3.src = "clear-day.png";
        console.log("clear day");
    } else if(icon == "clear-night"){
        day3.src = "clear-night.png";
        console.log("clear night");
    } else {
        day3.src = "clear-day.png";
        console.log("default");
    }

    icon = (data.locations[Object.keys(data.locations)].values[3].icon);
    if(icon == "rain"){
        day4.src = "rain.png";
        console.log("rain");
    } else if(icon == "wind"){
        day4.src = "wind.png";
        console.log("wind");
    } else if(icon == "cloudy"){
        day4.src = "cloudy.png";
        console.log("clouds");
    } else if(icon == "fog") {
        day4.src = "fog.png";
        console.log("fog");
    } else if(icon == "snow"){
        day4.src = "snow.png";
        console.log("snow");
    } else if(icon == "partly-cloudy-day"){
        day4.src = "partly-cloudy-day.png";
        console.log("partly cloudy day");
    } else if(icon == "partly-cloudy-night"){
        day4.src = "partly-cloudy-night.png";
        console.log("partly cloudly night");
    } else if(icon == "clear-day"){
        day4.src = "clear-day.png";
        console.log("clear day");
    } else if(icon == "clear-night"){
        day4.src = "clear-night.png";
        console.log("clear night");
    } else {
        day4.src = "clear-day.png";
        console.log("default");
    }

    icon = (data.locations[Object.keys(data.locations)].values[4].icon);
    if(icon == "rain"){
        day5.src = "rain.png";
        console.log("rain");
    } else if(icon == "wind"){
        day5.src = "wind.png";
        console.log("wind");
    } else if(icon == "cloudy"){
        day5.src = "cloudy.png";
        console.log("clouds");
    } else if(icon == "fog") {
        day5.src = "fog.png";
        console.log("fog");
    } else if(icon == "snow"){
        day5.src = "snow.png";
        console.log("snow");
    } else if(icon == "partly-cloudy-day"){
        day5.src = "partly-cloudy-day.png";
        console.log("partly cloudy day");
    } else if(icon == "partly-cloudy-night"){
        day5.src = "partly-cloudy-night.png";
        console.log("partly cloudly night");
    } else if(icon == "clear-day"){
        day5.src = "clear-day.png";
        console.log("clear day");
    } else if(icon == "clear-night"){
        day5.src = "clear-night.png";
        console.log("clear night");
    } else {
        day5.src = "clear-day.png";
        console.log("default");
    }

/*     for(let i = 0; i < data.locations[Object.keys(data.locations)].values.length; i++){
        let icon = (data.locations[Object.keys(data.locations)].values[i].icon);
        let test = icons[i];

        console.log("FUC");
        console.log(test)

        if(icon == "rain"){
            test.src = "file://C:\Users\joshs\Desktop\school\Projects\WeatherApp\rain.png";
            icons[i].classList.add("resize");
            console.log("rain");
        } else if(icon == "wind"){
            test.src = "wind.png";
            icons[i].classList.add("resize");
            console.log("wind");
        } else if(icon == "cloudy"){
            test.src = "cloudy.png";
            icons[i].classList.add("resize");
            console.log("clouds");
        } else if(icon == "fog") {
            test.src = "fog.png";
            icons[i].classList.add("resize");
            console.log("fog");
        } else if(icon == "snow"){
            icons[i].src = "snow.png";
            icons[i].classList.add("resize");
            console.log("snow");
        } else if(icon == "partly-cloudy-day"){
            icons[i].src = "/partly-cloudy-day.png";
            icons[i].classList.add("resize");
            console.log("partly cloudy day");
        } else if(icon == "partly-cloudy-night"){
            icons[i].src = "partly-cloudy-night.png";
            icons[i].classList.add("resize");
            console.log("partly cloudly night");
        } else if(icon == "clear-day"){
            icons[i].src = "clear-day.png";
            icons[i].classList.add("resize");
            console.log("clear day");
        } else if(icon == "clear-night"){
            icons[i].src = "clear-night.png";
            icons[i].classList.add("resize");
            console.log("clear night");
        } else {
            icons[i].src = "clear-day.png";
            icons[i].classList.add("resize");
            console.log("default");
        }

        console.log("these are tests");
        console.log(icons[i].src);
        console.log(icons[i]);
        console.log(icon);
        console.log(icons);


        let icontitle = `${icon}.png`;
        icons[i].src="";
    } */

});
})

function getDayName(dateStr, local){
    var date = new Date(dateStr);
    return date.toLocaleDateString(local, {weekday: 'long'});
}