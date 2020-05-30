import getCountryName from './countryCodes';

const keyForAPiInfo = '1242c96842c107';
const keyForClimaCell = 'rEjTfVZQwCwAbgfBMVVNUlTNtCYeft0V';
const keyForUnsplash = 'bCTB7zZHguyxXEXwMrWwQ5SZ2jFwQTKx-YdFmcBqUJs';
const keyForYandex = 'cd6f28a6-0e73-4a3f-bb7f-3febd6b954ad';
const keyForYandexTranslation =
    'trnsl.1.1.20200425T170620Z.55c8b9394267ab3a.3447d744700d3f2e8e6216551e211e2089052f54';

const getAverage = (array, index, value) => {
    return Math.round((array[index][value][1].max.value + array[index][value][0].min.value) / 2);
};

const fromCelsiusToFahrenheit = (celsius) => {
    return Math.round(celsius * 1.8 + 32);
};

const getTranslations = async (words, translationLanguages) => {
    const wordsForTranslation = words.map((word) => `&text=${word}`).join('');
    const translations = await Promise.all(
        translationLanguages
            .map(
                (lang) =>
                    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyForYandexTranslation}&lang=${lang}${wordsForTranslation}`
            )
            .map((url) => fetch(url).then((res) => res.json()))
    );

    return translations.reduce((acc, {lang, text}) => {
        acc[lang.split('-')[1]] = text;
        return acc;
    }, {});
};

const getTemperature = async (latitude, longitude) => {
    const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${keyForClimaCell}`;
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

    const translations = await getTranslations([city, country], ['en-ru', 'en-be']);
    translations.en = [city, country];

    return {
        city,
        country,
        latitude,
        longitude,
        weatherInfo,
        translations,
        latitudeNegative: +latitude < 0,
    };
};

const getCoordinatesWeather = async (address) => {
    const url = encodeURI(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${keyForYandex}&geocode=${address}&format=json&lang=ru-RU&results=1`
    );
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    const response = data.response.GeoObjectCollection.featureMember[0].GeoObject;

    const point = response.Point.pos;
    const latitude = point.split(' ')[1];
    const longitude = point.split(' ')[0];

    const weatherInfo = await getTemperature(latitude, longitude);

    const city = response.metaDataProperty.GeocoderMetaData.Address.Components.filter(
        (element) => element.kind === 'locality'
    )[0].name;

    const country = response.metaDataProperty.GeocoderMetaData.Address.Components.filter(
        (element) => element.kind === 'country'
    )[0].name;

    const translations = await getTranslations([city, country], ['ru-en', 'ru-be']);
    translations.ru = [city, country];

    return {
        city: translations.en[0],
        country: translations.en[1],
        latitude: `${latitude}`,
        longitude: `${longitude}`,
        weatherInfo,
        translations,
        latitudeNegative: +latitude < 0,
    };
};

const getBackground = async (searchParametrs) => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${searchParametrs}&client_id=${keyForUnsplash}`;
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
