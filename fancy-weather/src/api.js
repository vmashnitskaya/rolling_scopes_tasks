import getCountryName from './countryCodes';

const keyForAPiInfo = '1242c96842c107';
const keyForClimaCell = 'rEjTfVZQwCwAbgfBMVVNUlTNtCYeft0V';
const keyForUnsplash = 'bCTB7zZHguyxXEXwMrWwQ5SZ2jFwQTKx-YdFmcBqUJs';

const getAverage = (max, min) => {
    return Math.round((max + min) / 2);
};

const getTemperature = async (latitude, longitude) => {
    const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=rh8L0roTYDgi9hvbGsd6X3cu5rRWiV05`;
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    const infoForNearestDays = data.slice(1, 5);

    return {
        todayTemperature: {
            temp: getAverage(
                infoForNearestDays[0].temp[1].max.value,
                infoForNearestDays[0].temp[0].min.value
            ),
            overview: infoForNearestDays[0].weather_code.value,
            feels: getAverage(
                infoForNearestDays[0].feels_like[1].max.value,
                infoForNearestDays[0].feels_like[0].min.value
            ),
            wind: getAverage(
                infoForNearestDays[0].wind_speed[1].max.value,
                infoForNearestDays[0].wind_speed[0].min.value
            ),
            humidity: Math.round(
                (infoForNearestDays[0].humidity[1].max.value +
                    infoForNearestDays[0].humidity[0].min.value) /
                    2
            ),
        },
        tomorrowTemperature: getAverage(
            infoForNearestDays[1].temp[1].max.value,
            infoForNearestDays[1].temp[0].min.value
        ),
        afterTomorrowTemperature: getAverage(
            infoForNearestDays[2].temp[1].max.value,
            infoForNearestDays[2].temp[0].min.value
        ),
        afterAfterTomorrowTemperature: getAverage(
            infoForNearestDays[3].temp[1].max.value,
            infoForNearestDays[3].temp[0].min.value
        ),
    };
};

const getLocation = async () => {
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

const getBackground = async () => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=weather&client_id=${keyForUnsplash}`;
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    return data.urls.full;
};

export default {
    getLocation,
    getBackground,
};
