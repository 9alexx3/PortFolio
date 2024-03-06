const background = document.getElementById('weather-bg')

const get_Weather = () => {
    fetch('http://api.weatherapi.com/v1/current.json?key=ad0c3e0674a2486a882210512240303&q=Elche&aqi=no',
    {
      mode: 'cors',
    })
   .then(e => {
        e.json()
        .then((res) => {
            
            const { temp_c, feelslike_c, pressure_mb, precip_mm, is_day, wind_kph, humidity, cloud } = res.current
            const { text, code } = res.current.condition

    
            const taskbar_icon = document.getElementById('taskbar-icon')

            const taskbar_temperature = document.getElementById('taskbar-objects--temperature')
            const taskbar_description = document.getElementById('taskbar-objects--description')
            const status_weather = document.getElementById('status-weather')
            const temperature = document.getElementById('temperature-card')
            const feels_Like = document.getElementById('feels_Like')
            const weather_icon = document.getElementById('weather_icon')

            const wind = document.getElementById('wind')
            const moist = document.getElementById('humidity')
            const pressure = document.getElementById('pressure_mb')
            const precip = document.getElementById('precip_mm')
            const cloudiness = document.getElementById('cloudiness')

            status_weather.textContent = text
            taskbar_description.textContent = text

            temperature.textContent = `${temp_c}ºC`
            taskbar_temperature.textContent = `${temp_c}ºC`
            feels_Like.textContent = `Feels like: ${feelslike_c}ºC`

            wind.textContent = `${wind_kph}kph.`
            moist.textContent = `${humidity}%`
            pressure.textContent = `${pressure_mb}mb.`
            precip.textContent = `${precip_mm}mm.`
            cloudiness.textContent = `${cloud}%`

            switch(code){
                case 1000: // Despejado

                    if(is_day === 1){ // Yes
                        weather_icon.src = "../images/windows/weather/sunny.svg"
                        background.style.backgroundImage = "url('../images/windows/weather/bg-sunny.webp')"
                        taskbar_icon.src = "../images/windows/weather/sunny.svg"
                    }else{
                        weather_icon.src = "../images/windows/weather/moon.svg"
                        background.style.background = "url('../images/windows/weather/bg-night.webp')"
                        taskbar_icon.src = "../images/windows/weather/moon.svg"
                    }
                    
                break;

                case 1003: // Nublado
                case 1009:
                case 1030:
                    if(is_day === 1){
                        weather_icon.src = '../images/windows/weather/cloud.svg'
                        background.style.backgroundImage = "url('../images/windows/weather/bg-cloud-sunny.webp')"
                        taskbar_icon.src = '../images/windows/weather/cloud.svg'
                    }else{
                        background.style.backgroundImage = "url('../images/windows/weather/bg-cloud.webp')"
                        weather_icon.src = '../images/windows/weather/cloud-night.svg'
                        taskbar_icon.src = '../images/windows/weather/cloud-night.svg' 
                    }
                break;
                
                default:
                    weather_icon.src = '../images/windows/weather/rain.svg'
                    background.style.backgroundImage = "url('../images/windows/weather/bg-rain.webp')"
                    taskbar_icon.src = "../images/windows/weather/rain.svg"
                break;
            }

        })
        .catch(e => console.error(e))
    })
   .catch(e => console.error(e))
}

let code
const weather = document.getElementById('weather-main')

get_Weather()

    const list_click = ['taskbar-objects--description', 'taskbar-objects--temperature','taskbar-icon', 'weather-main', '']
    // weather.addEventListener("click", (e) => {
    //     if (background.style.)
    //     background.style.visibility = "visible"
    //     console.log(background.style.display)
    // })

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#weather-main") && !e.target.closest("#weather-bg")) {
            background.style.visibility = "hidden";
        }else{
            background.style.visibility = "visible";
        }
    })