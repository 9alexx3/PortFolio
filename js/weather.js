const background = document.getElementById('weather-bg');

const get_Weather = async () => {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=ad0c3e0674a2486a882210512240303&q=Elche&aqi=no', { mode: 'cors' });
        const res = await response.json();
        
        const {
            temp_c,
            feelslike_c,
            pressure_mb,
            precip_mm,
            is_day,
            wind_kph,
            humidity,
            cloud,
            condition: { text, code }
        } = res.current;

        // Taskbar and Weather elements
        const taskbar_temperature = document.getElementById('taskbar-objects--temperature');
        const taskbar_description = document.getElementById('taskbar-objects--description');
        const status_weather = document.getElementById('status-weather');
        const temperature = document.getElementById('temperature-card');
        const feels_Like = document.getElementById('feels_Like');

        // Additional info
        const wind = document.getElementById('wind');
        const moist = document.getElementById('humidity');
        const pressure = document.getElementById('pressure_mb');
        const precip = document.getElementById('precip_mm');
        const cloudiness = document.getElementById('cloudiness');

        // Update weather information
        status_weather.textContent = text;
        taskbar_description.textContent = text;
        temperature.textContent = `${temp_c}ºC`;
        taskbar_temperature.textContent = `${temp_c}ºC`;
        feels_Like.textContent = `Feels like: ${feelslike_c}ºC`;

        wind.textContent = `${wind_kph}kph.`;
        moist.textContent = `${humidity}%`;
        pressure.textContent = `${pressure_mb}mb.`;
        precip.textContent = `${precip_mm}mm.`;
        cloudiness.textContent = `${cloud}%`;

        // Update icons and background based on weather condition
        const weatherConfig = {
            clearDay: { icon: "\uE008", bg: "bg-sunny.webp" },
            clearNight: { icon: "\uE012", bg: "bg-night.webp" },
            cloudyDay: { icon: "\uE011", bg: "bg-cloud-sunny.webp" },
            cloudyNight: { icon: "\uE009", bg: "bg-cloud.webp" },
            rainy: { icon: "\uE010", bg: "bg-rain.webp" }
        };

        switch (code) {
            case 1000: // Clear
                const clearConfig = is_day === 1 ? weatherConfig.clearDay : weatherConfig.clearNight;
                updateWeatherDisplay(clearConfig);
                break;

            case 1003: // Partly cloudy
            case 1009:
            case 1030:
                const cloudyConfig = is_day === 1 ? weatherConfig.cloudyDay : weatherConfig.cloudyNight;
                updateWeatherDisplay(cloudyConfig);
                break;

            default: // Rainy weather
                updateWeatherDisplay(weatherConfig.rainy);
                break;
        }

    } catch (error) {
        console.error(error);
    }
};

// Function to update icon and background
const updateWeatherDisplay = ({ icon, bg }) => {
    const weather_icon = document.getElementById('weather_icon');
    const taskbar_icon = document.getElementById('taskbar-icon');
    const background = document.getElementById('weather-bg');

    weather_icon.textContent = icon;
    taskbar_icon.textContent = icon;
    background.style.backgroundImage = `url('../images/windows/weather/${bg}')`;
};

// Weather update on click event
document.addEventListener("click", (e) => {
    const background = document.getElementById('weather-bg');
    if (!e.target.closest("#weather-main") && !e.target.closest("#weather-bg")) {
        background.style.visibility = "hidden";
    } else {
        background.style.visibility = "visible";
    }
});

// Fetch weather data
get_Weather();