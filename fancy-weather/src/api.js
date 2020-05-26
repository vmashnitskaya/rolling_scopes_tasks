import getCountryName from './countryCodes';
import localization from './localization';

const keyForAPiInfo = '1242c96842c107';
const keyForClimaCell = 'rEjTfVZQwCwAbgfBMVVNUlTNtCYeft0V';
const keyForUnsplash = 'bCTB7zZHguyxXEXwMrWwQ5SZ2jFwQTKx-YdFmcBqUJs';
const keyForUnsplash1 = 'pFikN91oIsf3zqcjnQ86ZQkUiCok39F9zMz2UEtSVn0';
const keyForYandex = 'cd6f28a6-0e73-4a3f-bb7f-3febd6b954ad';
const keyForOpemCage = '83e064d6811247aa80e8a6f373fefec8';

const getAverage = (array, index, value) => {
    return Math.round((array[index][value][1].max.value + array[index][value][0].min.value) / 2);
};

const fromCelsiusToFahrenheit = (celsius) => {
    return Math.round(celsius * 1.8 + 32);
};

const getTranslations = async (words) => {
    const wordsForTranslation = words.map((word) => `&text=${word}`).join('');
    const translations = await Promise.all(
        ['en-ru', 'en-be']
            .map(
                (lang) =>
                    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T170620Z.55c8b9394267ab3a.3447d744700d3f2e8e6216551e211e2089052f54&lang=${lang}${wordsForTranslation}`
            )
            .map((url) => fetch(url).then((res) => res.json()))
    );

    return translations.reduce((acc, {lang, text}) => {
        acc[lang.split('-')[1]] = text;
        return acc;
    }, {});
};

const getTemperature = async (latitude, longitude) => {
    const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=rEjTfVZQwCwAbgfBMVVNUlTNtCYeft0V`;
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    const infoForNearestDays = data.slice(1, 5);

    const todayTemp = getAverage(infoForNearestDays, 0, 'temp');
    const todayFeels = getAverage(infoForNearestDays, 0, 'feels_like');

    const tomorrowTemperature = getAverage(infoForNearestDays, 1, 'temp');
    const tomorrowFeels = getAverage(infoForNearestDays, 1, 'feels_like');

    const afterTomorrowTemperature = getAverage(infoForNearestDays, 2, 'temp');
    const afterTomorrowFeels = getAverage(infoForNearestDays, 2, 'feels_like');

    const afterAfterTomorrowTemperature = getAverage(infoForNearestDays, 3, 'temp');
    const afterAfterTomorrowFeels = getAverage(infoForNearestDays, 3, 'feels_like');

    return {
        todayTemperature: {
            tempC: todayTemp,
            tempF: fromCelsiusToFahrenheit(todayTemp),
            overview: infoForNearestDays[0].weather_code.value,
            feelsC: todayFeels,
            feelsF: fromCelsiusToFahrenheit(todayFeels),
            wind: getAverage(infoForNearestDays, 0, 'wind_speed'),
            humidity: getAverage(infoForNearestDays, 0, 'humidity'),
        },
        tomorrowTemperature: {
            tempC: tomorrowTemperature,
            tempF: fromCelsiusToFahrenheit(tomorrowTemperature),
            overview: infoForNearestDays[1].weather_code.value,
            feelsC: tomorrowFeels,
            feelsF: fromCelsiusToFahrenheit(tomorrowFeels),
            wind: getAverage(infoForNearestDays, 1, 'wind_speed'),
            humidity: getAverage(infoForNearestDays, 1, 'humidity'),
        },
        afterTomorrowTemperature: {
            tempC: afterTomorrowTemperature,
            tempF: fromCelsiusToFahrenheit(afterTomorrowTemperature),
            overview: infoForNearestDays[2].weather_code.value,
            feelsC: afterTomorrowFeels,
            feelsF: fromCelsiusToFahrenheit(afterTomorrowFeels),
            wind: getAverage(infoForNearestDays, 2, 'wind_speed'),
            humidity: getAverage(infoForNearestDays, 2, 'humidity'),
        },
        afterAfterTomorrowTemperature: {
            tempC: afterAfterTomorrowTemperature,
            tempF: fromCelsiusToFahrenheit(afterAfterTomorrowTemperature),
            overview: infoForNearestDays[3].weather_code.value,
            feelsC: afterAfterTomorrowFeels,
            feelsF: fromCelsiusToFahrenheit(afterAfterTomorrowFeels),
            wind: getAverage(infoForNearestDays, 3, 'wind_speed'),
            humidity: getAverage(infoForNearestDays, 3, 'humidity'),
        },
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

    const {city} = data;
    const country = getCountryName(data.country);

    const translations = await getTranslations([city, country]);

    translations.en = [city, country];

    return {
        city,
        country,
        latitude,
        longitude,
        weatherInfo,
        translations,
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
    const city =
        data.results[0].components.village ||
        data.results[0].components.suburb ||
        data.results[0].components.town ||
        data.results[0].components.county ||
        data.results[0].components.city ||
        data.results[0].components.state;
    const {country} = data.results[0].components;

    const translations = await getTranslations([city, country]);

    translations.en = [city, country];

    return {
        city,
        country,
        latitude: `${data.results[0].geometry.lat}`,
        longitude: `${data.results[0].geometry.lng}`,
        weatherInfo,
        translations,
    };
};

const getBackground = async (searchParametrs) => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${searchParametrs}&client_id=pFikN91oIsf3zqcjnQ86ZQkUiCok39F9zMz2UEtSVn0`;
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    return data.urls.regular;
};

export default {
    getLocationWeather,
    getCoordinatesWeather,
    getBackground,
    getTranslations,
};
