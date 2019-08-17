const $ = document.querySelector.bind(document);

const formatDate = (date) => {
  const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const formatted = new Date(date * 1000).toLocaleTimeString("en-US", options);
  return formatted;
};

const getIconClass = (description) => ({
    "clear sky": "wi-day-sunny",
    "few clouds": "wi-cloud",
    "scattered clouds": "wi-cloudy",
    "broken clouds": "wi-cloudy",
    "shower rain": "wi-showers",
    "rain": "wi-rain",
    "thunderstorm": "wi-thunderstorm",
    "snow": "wi-snow",
    "fog": "wi-fog"
  }[description] || "wi-cloud");

const renderWeatherData = (data) => {
  console.log(data);
  const weather = {
    location: data.name + ", " + data.sys.country,
    lastUpdated: "Last updated " + formatDate(data.dt),
    status: data.weather[0].description,
    temp: parseInt(data.main.temp) + "°",
    humidity: data.main.humidity + "%",
    windSpeed: data.wind.speed + " mph",
    pressure: data.main.pressure + " hPa",
    iconClass: getIconClass(data.weather[0].description)
  };

  $(".setting__location").textContent = weather.location;
  $(".setting__last-updated").textContent = weather.lastUpdated;
  $(".status__text").textContent = weather.status;
  $(".stats__temp").textContent = weather.temp;
  $(".humidity__text").textContent = weather.humidity;
  $(".wind__text").textContent = weather.windSpeed;
  $(".pressure__text").textContent = weather.pressure;
  $(".status__icon .wi").classList.add(weather.iconClass);
  $(".wrapper").style.visibility = "visible";
};

const getWeather = (position) => {
  const params = [
    `lat=${position.coords.latitude}`,
    `lon=${position.coords.longitude}`,
    "units=imperial",
    "appid=725ea364b7228120fc098da2cba79b0c"
  ];
  
  fetch("https://api.openweathermap.org/data/2.5/weather?" + params.join("&"))
    .then(res => res.json())
    .then(data => renderWeatherData(data))
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

getLocation();
