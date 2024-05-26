let cityName = document.querySelector(".weather_city")
let dateTime = document.querySelector(".weather_date_time")
let w_icon = document.querySelector(".weather_icon")
let w_forecast = document.querySelector(".weather_forecast")
let w_temperature = document.querySelector(".weather_temperature")
let w_minTem = document.querySelector(".weather_min")
let w_maxTem = document.querySelector(".weather_max")

let w_feelsLike = document.querySelector(".weather_fellsLike")
let w_humidity = document.querySelector(".weather_humidity")
let w_wind = document.querySelector(".weather_wind")
let w_pressure = document.querySelector(".weather_pressure")

let citySearch = document.querySelector(".weather_search")




const getContryName = (code) =>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

const getDateTime = (dt) =>{
    const currentDate = new Date(dt * 1000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    const formatter = new Intl.DateTimeFormat("en-US", options)
    return formatter.format(currentDate)
}

let city = "kolaghat"
 citySearch.addEventListener("submit", (event) =>{
    event.preventDefault()
   let cityName = document.querySelector(".city");
   console.log(cityName.value);
   city = cityName.value
   getWeatherData();
   cityName.value = null
 }) 

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=88be107b86a94a592a1305a7d8c8ed4b`
    try{
        const res = await fetch(weatherUrl)
        const data = await res.json()
        const {main,name,weather,wind,sys,dt} = data

        cityName.innerHTML = `${name},${getContryName(sys.country)}`
        dateTime.innerHTML = getDateTime(dt)
        w_temperature.innerHTML = `${main.temp}&#176`
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`

        w_forecast.innerHTML = weather[0].main
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/> `


        w_feelsLike.innerHTML =`${main.feels_like.toFixed()}&#176`
        w_humidity.innerHTML = `${main.humidity.toFixed()}%`
        w_wind.innerHTML = `${wind.speed.toFixed()}m/s`
        w_pressure.innerHTML = `${main.pressure}hpa`
       
    }
   catch(error){
    console.log(error)
   }
}
getWeatherData();
document.body.addEventListener("load",getWeatherData)

