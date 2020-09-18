import localization from './localization';

const localizationMessages = {
    en: ({weatherInfo}, unit) => `
    Today it is expected ${localization.en.overview[weatherInfo.todayTemperature.overview]}. 
    The temperature is ${
        unit === 'C' ? weatherInfo.todayTemperature.tempC : weatherInfo.todayTemperature.tempF
    } degrees ${unit === 'C' ? 'centigrade' : 'Fahrenheit'} and feels like ${
        unit === 'C' ? weatherInfo.todayTemperature.feelsC : weatherInfo.todayTemperature.feelsF
    } degrees ${unit === 'C' ? 'centigrade' : 'Fahrenheit'}. 
    The humidity is ${weatherInfo.todayTemperature.humidity} percent and wind speed is reaching ${
        weatherInfo.todayTemperature.wind
    } meters per second.`,
    ru: ({weatherInfo}, unit) => `
    Сегодня будет ${localization.ru.overview[weatherInfo.todayTemperature.overview]}. 
    Температура составит ${
        unit === 'C' ? weatherInfo.todayTemperature.tempC : weatherInfo.todayTemperature.tempF
    } ${unit === 'C' ? 'по Цельсию' : 'по Фаренгейту'}. 
    Что будет ощущатся как ${
        unit === 'C' ? weatherInfo.todayTemperature.tempC : weatherInfo.todayTemperature.tempF
    } ${unit === 'C' ? 'по Цельсию' : 'по Фаренгейту'}. 
    Влажность составит ${weatherInfo.todayTemperature.humidity}%,
    а скорость ветра будет достигать ${weatherInfo.todayTemperature.wind} метров в секунду`,
    be: ({weatherInfo}, unit) => `
    Сегодня будет ${localization.ru.overview[weatherInfo.todayTemperature.overview]}. 
    Температура составит ${
        unit === 'C' ? weatherInfo.todayTemperature.tempC : weatherInfo.todayTemperature.tempF
    } ${unit === 'C' ? 'по Цельсию' : 'по Фаренгейту'}. 
    Что будет ощущатся как ${
        unit === 'C' ? weatherInfo.todayTemperature.tempC : weatherInfo.todayTemperature.tempF
    } ${unit === 'C' ? 'по Цельсию' : 'по Фаренгейту'}. 
    Влажность составит ${weatherInfo.todayTemperature.humidity}%,
    а скорость ветра будет достигать ${weatherInfo.todayTemperature.wind} метров в секунду`,
};
export default localizationMessages;
