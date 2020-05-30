import localization from '../localization';

const Ticker = (
    {weatherInfo},
    {dayTomorrow, dayAfterTomorrow, dayAfterAfterTomorrow},
    lang,
    unit
) => `
    <div class="ticker">
        <div class="ticker__one-day">${localization[lang].weekDays[dayTomorrow]}:
            <span class="ticker__one-day-temp feature">
                ${
                    unit === 'C'
                        ? `${weatherInfo.tomorrowTemperature.tempC}`
                        : `${weatherInfo.tomorrowTemperature.tempF}`
                }°
            </span>
            <span class="ticker__one-day-overview feature">
                ${localization[lang].overview[weatherInfo.tomorrowTemperature.overview]}
            </span>
            <span class="ticker__one-day-feels feature">
            ${localization[lang].feels.toLowerCase()}
            <span class="one-day feels">${
                unit === 'C'
                    ? `${weatherInfo.tomorrowTemperature.feelsC}`
                    : `${weatherInfo.tomorrowTemperature.feelsF}`
            }</span>°
            </span>
            <span class="ticker__one-day-wind feature">
                ${localization[lang].wind.toLowerCase()}
                <span class="wind">${weatherInfo.tomorrowTemperature.wind}</span>
                ${localization[lang].wind_unit.toLowerCase()}
            </span>
            <span class="ticker__one-day-humidity feature">
                ${localization[lang].humidity.toLowerCase()}
                <span class="humidity">${weatherInfo.todayTemperature.humidity}</span>%
            </span>
        </div>
        <div class="ticker__two-day">${localization[lang].weekDays[dayAfterTomorrow]}:
            <span class="ticker__two-day-temp feature">
                ${
                    unit === 'C'
                        ? `${weatherInfo.afterTomorrowTemperature.tempC}`
                        : `${weatherInfo.afterTomorrowTemperature.tempF}`
                }°
            </span>
            <span class="ticker__two-day-overview feature">
                ${localization[lang].overview[weatherInfo.afterTomorrowTemperature.overview]}
            </span>
            <span class="ticker__two-day-feels feature">
            ${localization[lang].feels.toLowerCase()}
                <span class="two-day feels">${
                    unit === 'C'
                        ? `${weatherInfo.afterTomorrowTemperature.feelsC}`
                        : `${weatherInfo.afterTomorrowTemperature.feelsF}`
                }</span>°
            </span>
            <span class="ticker__two-day-wind feature">
                ${localization[lang].wind.toLowerCase()}
                <span class="wind">${weatherInfo.afterTomorrowTemperature.wind}</span>
                ${localization[lang].wind_unit.toLowerCase()}
            </span>
            <span class="ticker__two-day-humidity feature">
                ${localization[lang].humidity.toLowerCase()}
                <span class="humidity">${weatherInfo.afterTomorrowTemperature.humidity}</span>%
            </span>
        </div>
        <div class="ticker__three-day">${localization[lang].weekDays[dayAfterAfterTomorrow]}:
        <span class="ticker__three-day-temp feature">
            ${
                unit === 'C'
                    ? `${weatherInfo.afterAfterTomorrowTemperature.tempC}`
                    : `${weatherInfo.afterAfterTomorrowTemperature.tempF}`
            }°
        </span>
        <span class="ticker__three-day-overview feature">
            ${localization[lang].overview[weatherInfo.afterAfterTomorrowTemperature.overview]}
        </span>
        <span class="ticker__three-day-feels feature">
            ${localization[lang].feels.toLowerCase()}
            <span class="three-day feels">${
                unit === 'C'
                    ? `${weatherInfo.afterAfterTomorrowTemperature.feelsC}`
                    : `${weatherInfo.afterAfterTomorrowTemperature.feelsF}`
            }</span>°
        </span>
        <span class="ticker__three-day-wind feature">
            ${localization[lang].wind.toLowerCase()}
            <span class="wind">${weatherInfo.afterAfterTomorrowTemperature.wind}</span>
            ${localization[lang].wind_unit.toLowerCase()}
        </span>
        <span class="ticker__three-day-humidity feature">
            ${localization[lang].humidity.toLowerCase()}
            <span class="humidity">${weatherInfo.afterAfterTomorrowTemperature.humidity}</span>%
        </span>
    </div>
    </div>
`;

export default Ticker;
