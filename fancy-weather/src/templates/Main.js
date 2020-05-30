import localization from '../localization';
import imagesPaths from '../imagesPaths';
import Ticker from './Ticker';

const Main = (data, dataForDisplaing, timeForDisplaying, unit, lang) => {
    const {city, latitude, longitude, weatherInfo, translations} = data;
    const {
        weekDay,
        month,
        monthDay,
        dayTomorrow,
        dayAfterTomorrow,
        dayAfterAfterTomorrow,
    } = dataForDisplaing;
    return `
<div class="container">
    <div class="forecast">
        <div class="weather">
            <div class="location">${
                city
                    ? `${translations[lang][0]}, ${translations[lang][1]}`
                    : `${translations[lang][1]}`
            }</div>
            <div class="time">
                <span class="time__date">${localization[lang].weekDays[weekDay].slice(0, 3)}  ${
        localization[lang].months[month]
    }  ${monthDay}</span>
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
                        <div class="feeling">${localization[lang].feels} <span class="feeling-temp">
                        ${
                            unit === 'C'
                                ? `${weatherInfo.todayTemperature.feelsC}`
                                : `${weatherInfo.todayTemperature.feelsF}`
                        }</span>°</div>
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
                    <div class="following-day__day">${
                        localization[lang].weekDays[dayTomorrow]
                    }</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature tomorrow">
                        ${
                            unit === 'C'
                                ? `${weatherInfo.tomorrowTemperature.tempC}`
                                : `${weatherInfo.tomorrowTemperature.tempF}`
                        }°
                        </div>
                        <div class="following-day__weather-animation"><img src="${
                            imagesPaths[weatherInfo.tomorrowTemperature.overview]
                        }" alt="weather image"></div>
                    </div>
                 </div>
                <div class="following-day">
                    <div class="following-day__day">
                    ${localization[lang].weekDays[dayAfterTomorrow]}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature after-tomorrow">
                        ${
                            unit === 'C'
                                ? `${weatherInfo.afterTomorrowTemperature.tempC}`
                                : `${weatherInfo.afterTomorrowTemperature.tempF}`
                        }°
                        </div>
                        <div class="following-day__weather-animation"><img src="${
                            imagesPaths[weatherInfo.afterTomorrowTemperature.overview]
                        }" alt="weather image"></div>
                    </div>
                </div>
                <div class="following-day">
                    <div class="following-day__day">
                    ${localization[lang].weekDays[dayAfterAfterTomorrow]}</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature after-after-tomorrow">
                        ${
                            unit === 'C'
                                ? `${weatherInfo.afterAfterTomorrowTemperature.tempC}`
                                : `${weatherInfo.afterAfterTomorrowTemperature.tempC}`
                        }°
                        </div>
                        <div class="following-day__weather-animation"><img src="${
                            imagesPaths[weatherInfo.afterAfterTomorrowTemperature.overview]
                        }" alt="weather image"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="map">
            <div class="map-wrapper" id="map-wrapper"></div>
            <div class="latitude">${localization[lang].latitude} <span>${`${
        latitude.split('.')[0]
    }'${data.latitude.split('.')[1].slice(0, 2)}`}°</span></div>
            <div class="longitude">${localization[lang].longitude} <span>${`${
        longitude.split('.')[0]
    }'${data.longitude.split('.')[1].slice(0, 2)}`}°</span></div>
        </div>
    </div>
</div>
<div class="ticker-wrapper">
    ${Ticker(data, dataForDisplaing, lang, unit)}
</div>
`;
};

export default Main;
