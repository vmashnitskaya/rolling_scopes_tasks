const Main = (
    {city, country, latitude, longitude, weatherInfo},
    {date, time, dayTomorrow, dayAfterTomorrow, dayAfterAfterTomorrow}
) => `

<div class="container">
    <div class="forecast">
        <div class="weather">
            <div class="location">${city ? `${city}, ${country}` : `${country}`}</div>
            <div class="time">
                <span class="time__date">${date}</span>
                <span class="time__timer">${time}</span>
            </div>
            <div class="day">
                <div class="day__temperature">${weatherInfo.todayTemperature.temp}</div>
                <div class="day__info">
                    <div class="day__info-animation"><img src="./img/animation.png" alt="weather image"></div>
                    <div class="day__info-text">
                        <div class="overview">${weatherInfo.todayTemperature.overview}</div>
                        <div class="feeling">Feels like: ${
                            weatherInfo.todayTemperature.feels
                        }°</div>
                        <div class="wind">Wind: ${weatherInfo.todayTemperature.wind}m/s</div>
                        <div class="humidity">Humidity: ${
                            weatherInfo.todayTemperature.humidity
                        }%</div>
                    </div>
                </div>
            </div>
            <div class="following-days">
                <div class="following-day">
                    <div class="following-day__day">${dayTomorrow}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature">${
                            weatherInfo.tomorrowTemperature
                        }°</div>
                        <div class="following-day__weather-animation"><img src="./img/cloud.png" alt="weather image"></div>
                    </div>
                 </div>
                <div class="following-day">
                    <div class="following-day__day">${dayAfterTomorrow}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature">${
                            weatherInfo.afterTomorrowTemperature
                        }°</div>
                        <div class="following-day__weather-animation"><img src="./img/cloud.png" alt="weather image"></div>
                    </div>
                </div>
                <div class="following-day">
                    <div class="following-day__day">${dayAfterAfterTomorrow}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature">${
                            weatherInfo.afterAfterTomorrowTemperature
                        }°</div>
                        <div class="following-day__weather-animation"><img src="./img/cloud.png" alt="weather image"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="map">
            <div class="map-wrapper" id="map-wrapper"></div>
            <div class="latitude">Latitude: <span>${latitude.split('.').join("'")}°</span></div>
            <div class="longitude">Longitude: <span>${longitude.split('.').join("'")}°</span></div>
        </div>
    </div>
</div>

`;

export default Main;
