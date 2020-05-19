import getCountryName from './countryCodes';

const keyForAPiInfo = '1242c96842c107';
const keyForClimaCell = 'rEjTfVZQwCwAbgfBMVVNUlTNtCYeft0V';
const keyForUnsplash = 'bCTB7zZHguyxXEXwMrWwQ5SZ2jFwQTKx-YdFmcBqUJs';
const keyForUnsplash1 = 'pFikN91oIsf3zqcjnQ86ZQkUiCok39F9zMz2UEtSVn0';
const keyForYandex = 'cd6f28a6-0e73-4a3f-bb7f-3febd6b954ad';
const keyForOpemCage = '83e064d6811247aa80e8a6f373fefec8';

const getAverage = (max, min) => {
    return Math.round((max + min) / 2);
};

const fromCelsiusToFahrenheit = (celsius) => {
    return Math.round(celsius * 1.8 + 32);
};

const getTemperature = async (latitude, longitude) => {
    const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=rh8L0roTYDgi9hvbGsd6X3cu5rRWiV05`;
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    const infoForNearestDays = data.slice(1, 5);

    const todayTemp = getAverage(
        infoForNearestDays[0].temp[1].max.value,
        infoForNearestDays[0].temp[0].min.value
    );
    const todayFeels = getAverage(
        infoForNearestDays[0].feels_like[1].max.value,
        infoForNearestDays[0].feels_like[0].min.value
    );

    const todayWind = getAverage(
        infoForNearestDays[0].wind_speed[1].max.value,
        infoForNearestDays[0].wind_speed[0].min.value
    );

    const todayHumidity = getAverage(
        infoForNearestDays[0].humidity[1].max.value,
        infoForNearestDays[0].humidity[0].min.value
    );

    const tomorrowTemperature = getAverage(
        infoForNearestDays[1].temp[1].max.value,
        infoForNearestDays[1].temp[0].min.value
    );

    const afterTomorrowTemperature = getAverage(
        infoForNearestDays[2].temp[1].max.value,
        infoForNearestDays[2].temp[0].min.value
    );

    const afterAfterTomorrowTemperature = getAverage(
        infoForNearestDays[3].temp[1].max.value,
        infoForNearestDays[3].temp[0].min.value
    );

    return {
        todayTemperature: {
            tempC: todayTemp,
            tempF: fromCelsiusToFahrenheit(todayTemp),
            overview: infoForNearestDays[0].weather_code.value.split('_').join(' '),
            feels: todayFeels,
            wind: todayWind,
            humidity: todayHumidity,
        },
        tomorrowTemperatureC: tomorrowTemperature,
        tomorrowTemperatureF: fromCelsiusToFahrenheit(tomorrowTemperature),
        afterTomorrowTemperatureC: afterTomorrowTemperature,
        afterTomorrowTemperatureF: fromCelsiusToFahrenheit(afterTomorrowTemperature),
        afterAfterTomorrowTemperatureC: afterAfterTomorrowTemperature,
        afterAfterTomorrowTemperatureF: fromCelsiusToFahrenheit(afterAfterTomorrowTemperature),
    };
};

const getLocationWeather = async () => {
    const url = `https://ipinfo.io/json?token=${keyForAPiInfo}`;

    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    const latitude = data.loc.split(',')[0];
    const longitude = data.loc.split(',')[1];

    const weatherInfo = await getTemperature(latitude, longitude);

    return {
        city: data.city,
        country: getCountryName(data.country),
        latitude,
        longitude,
        weatherInfo,
    };
};

const getCoordinatesWeather = async (adress) => {
    const url = encodeURI(
        `https://api.opencagedata.com/geocode/v1/json?q=${adress}&language=en&key=${keyForOpemCage}&pretty=1&no_annotations=1`
    );
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    const weatherInfo = await getTemperature(
        data.results[0].geometry.lat,
        data.results[0].geometry.lng
    );

    return {
        city:
            data.results[0].components.village ||
            data.results[0].components.suburb ||
            data.results[0].components.town ||
            data.results[0].components.county ||
            data.results[0].components.city ||
            data.results[0].components.state,
        country: data.results[0].components.country,
        latitude: `${data.results[0].geometry.lat}`,
        longitude: `${data.results[0].geometry.lng}`,
        weatherInfo,
    };
};

const getBackground = async (searchParametrs) => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${searchParametrs}&client_id=97468db9ac3f46aba050edeb6ee94ee6c2fa732c4970c3d260cdbf50156a6f44`;
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    return data.urls.regular;
};

export default {
    getLocationWeather,
    getCoordinatesWeather,
    getBackground,
};
