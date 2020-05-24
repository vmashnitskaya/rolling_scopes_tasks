import localization from '../localization';
import imagesPaths from '../imagesPaths';

const Main = (
    {city, latitude, longitude, weatherInfo, translations},
    {date, dayTomorrow, dayAfterTomorrow, dayAfterAfterTomorrow},
    timeForDisplaying,
    unit,
    lang
) => `

<div class="container">
    <div class="forecast">
        <div class="weather">
            <div class="location">${
                city
                    ? `${translations[lang][0]}, ${translations[lang][1]}`
                    : `${translations[lang][1]}`
            }</div>
            <div class="time">
                <span class="time__date">${date}</span>
                <span class="time__timer">${timeForDisplaying}</span>
            </div>
            <div class="day">
                <div class="day__temperature">${
                    unit === 'C'
                        ? `${weatherInfo.todayTemperature.tempC}`
                        : `${weatherInfo.todayTemperature.tempF}`
                }</div>
                <div class="day__info">
                    <div class="day__info-animation"><img src="${
                        imagesPaths[weatherInfo.todayTemperature.overview]
                    }" alt="weather image"></div>
                    <div class="day__info-text">
                        <div class="overview">${
                            localization[lang].overview[weatherInfo.todayTemperature.overview]
                        }</div>
                        <div class="feeling">${localization[lang].feels} ${
    weatherInfo.todayTemperature.feels
}°</div>
                        <div class="wind">${localization[lang].wind} ${
    weatherInfo.todayTemperature.wind
} ${localization[lang].wind_unit}</div>
                        <div class="humidity">${localization[lang].humidity} ${
    weatherInfo.todayTemperature.humidity
}%</div>
                    </div>
                </div>
            </div>
            <div class="following-days">
                <div class="following-day">
                    <div class="following-day__day">${dayTomorrow}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature tomorrow">
                        ${
                            unit === 'C'
                                ? `${weatherInfo.tomorrowTemperatureC}`
                                : `${weatherInfo.tomorrowTemperatureF}`
                        }°
                        </div>
                        <div class="following-day__weather-animation"><img src="${
                            imagesPaths[weatherInfo.tomorrowOverview]
                        }" alt="weather image"></div>
                    </div>
                 </div>
                <div class="following-day">
                    <div class="following-day__day">${dayAfterTomorrow}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature after-tomorrow">
                        ${
                            unit === 'C'
                                ? `${weatherInfo.afterTomorrowTemperatureC}`
                                : `${weatherInfo.afterTomorrowTemperatureF}`
                        }°
                        </div>
                        <div class="following-day__weather-animation"><img src="${
                            imagesPaths[weatherInfo.afterTomorrowOverview]
                        }" alt="weather image"></div>
                    </div>
                </div>
                <div class="following-day">
                    <div class="following-day__day">${dayAfterAfterTomorrow}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature after-after-tomorrow">
                        ${
                            unit === 'C'
                                ? `${weatherInfo.afterAfterTomorrowTemperatureC}`
                                : `${weatherInfo.afterAfterTomorrowTemperatureF}`
                        }°
                        </div>
                        <div class="following-day__weather-animation"><img src="${
                            imagesPaths[weatherInfo.afterAfterTomorrowOverview]
                        }" alt="weather image"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="map">
            <div class="map-wrapper" id="map-wrapper"></div>
            <div class="latitude">${localization[lang].latitude} <span>${latitude
    .split('.')
    .join("'")}°</span></div>
            <div class="longitude">${localization[lang].longitude} <span>${longitude
    .split('.')
    .join("'")}°</span></div>
        </div>
    </div>
</div>

`;

export default Main;
