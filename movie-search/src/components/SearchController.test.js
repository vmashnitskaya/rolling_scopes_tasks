// eslint-disable-next-line no-unused-vars
import createSpeechRecognition from '../createSpeechRecognition';
import api from '../api';
import SearchController from './SearchController';

jest.mock('../createSpeechRecognition');
jest.mock('../api');
const SearchViewMock = jest.genMockFromModule('./SearchView').default;
const SearchModelMock = jest.genMockFromModule('./SearchModel').default;

describe('SearchController', () => {
    let view;
    let model;
    let controller;
    let speechRecognition;
    beforeEach(() => {
        speechRecognition = {
            start: jest.fn(),
            abort: jest.fn(),
            isStarted: jest.fn(),
        };
        createSpeechRecognition.mockReturnValue(speechRecognition);

        api.getSearchResults.mockReset();

        view = new SearchViewMock();
        view.handleSearch = jest.fn();
        view.handleSlideVisible = jest.fn();
        view.handleKeyboardIconClick = jest.fn();
        view.handleKeyboardSoundnClick = jest.fn();
        view.changeTranslationMessage = jest.fn();
        view.showLoading = jest.fn();
        model = new SearchModelMock();
        controller = new SearchController(view, model);
    });
    describe('onDataChange', () => {
        test('with data', () => {
            model.totalResults = 2;
            const testData = [{}, {}];
            controller.onDataChange(testData);
            expect(view.addData.mock.calls.length).toBe(1);
            expect(view.addData.mock.calls[0][0]).toBe(testData);
        });
        test('without data', () => {
            model.totalResults = 0;
            model.searchValue = 'test';
            const testData = [];
            controller.onDataChange(testData);
            expect(view.addData.mock.calls.length).toBe(0);
            expect(view.setErrorMessage.mock.calls.length).toBe(1);
            expect(view.setErrorMessage.mock.calls[0][0]).toBe(
                'No search result for <span>test</span>'
            );
        });
        test('with data and translation', () => {
            model.totalResults = 2;
            model.translated = 'translated test';
            const testData = [{}, {}];
            controller.onDataChange(testData);
            expect(view.addData.mock.calls.length).toBe(1);
            expect(view.addData.mock.calls[0][0]).toBe(testData);
            expect(view.changeTranslationMessage.mock.calls.length).toBe(1);
            expect(view.changeTranslationMessage.mock.calls[0][0]).toBe('translated test');
        });
    });
    describe('onKeyboardVoiceClick', () => {
        test('speech recognition not started', () => {
            speechRecognition.isStarted.mockReturnValueOnce(false);
            controller.onKeyboardVoiceClick();
            expect(speechRecognition.start.mock.calls.length).toBe(1);
        });
        test('speech recognition started', () => {
            speechRecognition.isStarted.mockReturnValueOnce(true);
            controller.onKeyboardVoiceClick();
            expect(speechRecognition.abort.mock.calls.length).toBe(1);
        });
    });
    describe('onSearch', () => {
        const testData = {
            data: [
                {
                    Title: 'Beta Test',
                    Year: '2016',
                    imdbID: 'tt4244162',
                    Type: 'movie',
                    Poster:
                        'https://m.media-amazon.com/images/M/MV5BODdlMjU0MDYtMWQ1NC00YjFjLTgxMDQtNDYxNTg2ZjJjZDFiXkEyXkFqcGdeQXVyMTU2NTcxNDg@._V1_SX300.jpg',
                    rating: '5.7',
                },
                {
                    Title: 'Johnny Test',
                    Year: '2005–2014',
                    imdbID: 'tt0454349',
                    Type: 'series',
                    Poster:
                        'https://m.media-amazon.com/images/M/MV5BYzc3OGZjYWQtZGFkMy00YTNlLWE5NDYtMTRkNTNjODc2MjllXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg',
                    rating: '4.9',
                },
            ],
            totalResults: 2,
            page: 1,
        };
        test('data recieved', async () => {
            model.loading = false;
            api.getSearchResults.mockResolvedValueOnce(testData);
            await controller.onSearch('  test  ');
            expect(model.searchValue).toBe('test');
            expect(speechRecognition.abort.mock.calls.length).toBe(1);
            expect(view.showLoading.mock.calls.length).toBe(1);
            expect(model.translated).toBe('');
            expect(view.setSearchValue.mock.calls.length).toBe(1);
            expect(view.setSearchValue.mock.calls[0][0]).toBe('test');
            expect(view.changeTranslationMessage.mock.calls.length).toBe(1);
            expect(view.changeTranslationMessage.mock.calls[0][0]).toBeNull();
            expect(view.hideLoading.mock.calls.length).toBe(1);
            expect(model.data).toEqual(testData.data);
            expect(model.totalResults).toEqual(testData.totalResults);
            expect(model.page).toEqual(testData.page);
            expect(model.loading).toBeFalsy();
        });
        test('search already in progress', async () => {
            model.loading = true;
            api.getSearchResults.mockResolvedValueOnce(testData);
            await controller.onSearch('test');
            expect(speechRecognition.abort.mock.calls.length).toBe(0);
            expect(view.showLoading.mock.calls.length).toBe(0);
            expect(view.setSearchValue.mock.calls.length).toBe(0);
            expect(view.changeTranslationMessage.mock.calls.length).toBe(0);
            expect(view.hideLoading.mock.calls.length).toBe(0);
            expect(model.loading).toBeTruthy();
        });
        test('no data recieved', async () => {
            model.loading = false;
            api.getSearchResults.mockResolvedValueOnce({
                data: [],
                totalResults: 0,
                page: 1,
            });
            await controller.onSearch('  test  ');
            expect(model.searchValue).toBe('test');
            expect(speechRecognition.abort.mock.calls.length).toBe(1);
            expect(view.showLoading.mock.calls.length).toBe(1);
            expect(model.translated).toBe('');
            expect(view.setSearchValue.mock.calls.length).toBe(1);
            expect(view.setSearchValue.mock.calls[0][0]).toBe('test');
            expect(view.changeTranslationMessage.mock.calls.length).toBe(1);
            expect(view.changeTranslationMessage.mock.calls[0][0]).toBeNull();
            expect(view.hideLoading.mock.calls.length).toBe(1);
            expect(model.data).toEqual([]);
            expect(model.totalResults).toEqual(0);
            expect(model.page).toEqual(1);
            expect(model.loading).toBeFalsy();
        });
        test('value for translation recieved', async () => {
            model.loading = false;
            api.getSearchResults.mockResolvedValueOnce(testData);
            api.getSearchTranslation.mockResolvedValueOnce('test');
            await controller.onSearch('  тест  ');
            expect(model.searchValue).toBe('тест');
            expect(speechRecognition.abort.mock.calls.length).toBe(1);
            expect(view.showLoading.mock.calls.length).toBe(1);
            expect(model.translated).toBe('test');
            expect(view.setSearchValue.mock.calls.length).toBe(1);
            expect(view.setSearchValue.mock.calls[0][0]).toBe('тест');
            expect(view.changeTranslationMessage.mock.calls.length).toBe(1);
            expect(view.changeTranslationMessage.mock.calls[0][0]).toBeNull();
            expect(view.hideLoading.mock.calls.length).toBe(1);
            expect(model.data).toEqual(testData.data);
            expect(model.totalResults).toEqual(testData.totalResults);
            expect(model.page).toEqual(testData.page);
            expect(model.loading).toBeFalsy();
        });
    });
});
