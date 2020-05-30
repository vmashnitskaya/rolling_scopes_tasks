import ForecastController from './ForecastController';
import createSpeechRecognition from '../createSpeechRecognition';
import createSpeechSynthesis from '../createSpeechSynthesis';
import api from '../api';

jest.mock('../createSpeechRecognition');
jest.mock('../createSpeechSynthesis');
jest.mock('../api');
const ForecastViewMock = jest.genMockFromModule('./ForecastView').default;
const ForecastModelMock = jest.genMockFromModule('./ForecastModel').default;

describe('SearchController', () => {
    let view;
    let model;
    let controller;
    let speechRecognition;
    let speechSynthesis;
    beforeEach(() => {
        speechRecognition = {
            start: jest.fn(),
            stop: jest.fn(),
            isStarted: jest.fn(),
        };
        createSpeechRecognition.mockReturnValue(speechRecognition);

        speechSynthesis = {
            speak: jest.fn(),
            cancel: jest.fn(),
        };
        createSpeechSynthesis.mockReturnValue(speechSynthesis);

        api.getLocationWeather.mockReset();

        view = new ForecastViewMock();
        view.initPreliminarLayout = jest.fn();
        view.handleSearch = jest.fn();
        view.handleBackgroundChange = jest.fn();
        view.handleUnitChange = jest.fn();
        view.handleLocaleChange = jest.fn();
        view.handleSoundClick = jest.fn();
        view.handleForecastAloud = jest.fn();
        view.setErrorPage = jest.fn();
        view.setErrorDisplaying = jest.fn();
        view.updateTemperatureUnits = jest.fn();
        view.changeHeaderLocalization = jest.fn();
        view.setSpeechText = jest.fn();
        view.changeIconColor = jest.fn();
        view.setSpeechText = jest.fn();

        model = new ForecastModelMock();
        controller = new ForecastController(view, model);
        controller.onLayoutChange = jest.fn();
        controller.onBackgroundChange = jest.fn();
        controller.onForecastAloud = jest.fn();
    });
    describe('on init main layout', () => {
        test('data recieved', async () => {
            const testData = {
                city: 'City',
                country: 'Country',
                latitude: '111',
                longitude: '111',
                weatherInfo: {
                    todayTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    tomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    afterTomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    afterAfterTomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                },
                translations: {
                    en: ['city-en', 'country-en'],
                    ru: ['city-ru', 'country-ru'],
                    be: ['city-be', 'country-be'],
                },
                latitudeNegative: true,
            };
            api.getLocationWeather.mockResolvedValueOnce(testData);
            await controller.onInitMainLayout();
            expect(model.locationWeatherData).toEqual(testData);
            expect(controller.onLayoutChange).toHaveBeenCalled();
            expect(controller.onBackgroundChange).toHaveBeenCalled();
        });
    });
    describe('on search', () => {
        test('data not recieved', async () => {
            const testData = {
                city: 'City',
                country: 'Country',
                latitude: '111',
                longitude: '111',
                weatherInfo: {
                    todayTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    tomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    afterTomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    afterAfterTomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                },
                translations: {
                    en: ['city-en', 'country-en'],
                    ru: ['city-ru', 'country-ru'],
                    be: ['city-be', 'country-be'],
                },
                latitudeNegative: true,
            };
            const criteria = 'criteria';
            api.getCoordinatesWeather.mockResolvedValueOnce(testData);
            await controller.onSearch(criteria);
            expect(view.setErrorDisplaying).toHaveBeenCalledWith(false);
            expect(controller.onLayoutChange).toHaveBeenCalled();
            expect(controller.onBackgroundChange).toHaveBeenCalled();
        });
    });
    describe('on background criteria changed', () => {
        test('english language, latitude negative', () => {
            model.time = '6:36:12 PM';
            model.lang = 'en';
            model.month = '3';
            model.locationWeatherData = {
                city: 'City',
                country: 'Country',
                latitude: '111',
                longitude: '111',
                weatherInfo: {
                    todayTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    tomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    afterTomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                    afterAfterTomorrowTemperature: {
                        tempC: 10,
                        tempF: 10,
                        overview: 'overview',
                        feelsC: 10,
                        feelsF: 10,
                        wind: 10,
                        humidity: 10,
                    },
                },
                translations: {
                    en: ['city-en', 'country-en'],
                    ru: ['city-ru', 'country-ru'],
                    be: ['city-be', 'country-be'],
                },
                latitudeNegative: false,
            };
            const testCriteia = 'evening,spring';
            const criteria = controller.onBackgroundCriteriaChange();
            expect(criteria).toBe(testCriteia);
        });
    });
    describe('on unit change', () => {
        test('change to Fahrenheit unit', () => {
            model.unit = 'C';
            const newUnit = 'F';
            controller.onUnitChange(newUnit);
            expect(model.unit).toBe(newUnit);
        });
    });
    describe('on locale change', () => {
        test('change to Russian language', async () => {
            const newLang = 'ru';
            model.lang = 'en';
            await controller.onLocaleChange(newLang);
            expect(model.lang).toBe(newLang);
            expect(view.changeHeaderLocalization).toHaveBeenCalledWith(newLang);
            expect(controller.onLayoutChange).toBeCalled();
        });
    });
    describe('on search text said by user', () => {
        test('anounce weather when code pharase forecast is used', () => {
            const textSaid = 'forecast';
            controller.handleSpeechText(textSaid);
            expect(controller.onForecastAloud).toBeCalled();
        });
        test('search by location name', () => {
            const textSaid = 'city';
            controller.handleSpeechText(textSaid);
            expect(view.setSpeechText).toHaveBeenCalledWith(textSaid);
        });
    });
    describe('on error recieved', () => {
        test('recieve error', () => {
            const error = {message: 'error-message'};
            controller.onError(error);
            expect(model.error).toEqual(error.message);
            expect(view.setErrorPage).toBeCalled();
        });
    });
    describe('format date and time', () => {
        test('format date and time', () => {
            const date = ['Sat, 30 May 2020, 9:42:57 pm', 'Sunday', 'Monday', 'Tuesday'];
            const expectedDate = {
                date: 'Sat 30 May',
                dayTomorrow: 'Sunday',
                dayAfterTomorrow: 'Monday',
                dayAfterAfterTomorrow: 'Tuesday',
            };
            const resultDate = ForecastController.getdateTime(date);
            expect(resultDate).toEqual(expectedDate);
        });
    });
});
