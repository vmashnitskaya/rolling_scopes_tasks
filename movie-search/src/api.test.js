import fetchMock from 'jest-fetch-mock';
import api from './api';

fetchMock.enableFetchMocks();

describe('api', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.doMock();
    });
    test('getSearchTranslation', async () => {
        fetchMock.mockResponse(async (req) => {
            if (req.url.startsWith('https://translate.yandex.net/')) {
                return JSON.stringify({text: ['translated value']});
            }
            throw new Error('bad url');
        });
        await expect(api.getSearchTranslation('test value')).resolves.toBe('translated value');
    });
    test('getSearchResults', async () => {
        fetchMock.mockResponse(async (req) => {
            if (req.url === 'https://www.omdbapi.com/?s=test&page=1&apikey=1adbf2cc') {
                return JSON.stringify({
                    Search: [
                        {
                            Title: 'Beta Test',
                            Year: '2016',
                            imdbID: 'tt4244162',
                            Type: 'movie',
                            Poster:
                                'https://m.media-amazon.com/images/M/MV5BODdlMjU0MDYtMWQ1NC00YjFjLTgxMDQtNDYxNTg2ZjJjZDFiXkEyXkFqcGdeQXVyMTU2NTcxNDg@._V1_SX300.jpg',
                        },
                        {
                            Title: 'Johnny Test',
                            Year: '2005–2014',
                            imdbID: 'tt0454349',
                            Type: 'series',
                            Poster:
                                'https://m.media-amazon.com/images/M/MV5BYzc3OGZjYWQtZGFkMy00YTNlLWE5NDYtMTRkNTNjODc2MjllXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg',
                        },
                    ],
                    totalResults: 2,
                    Response: 'True',
                });
            }
            if (req.url.includes('tt0454349')) {
                return JSON.stringify({
                    imdbID: 'tt0454349',
                    imdbRating: '4.9',
                });
            }
            if (req.url.includes('tt4244162')) {
                return JSON.stringify({
                    imdbID: 'tt4244162',
                    imdbRating: '5.7',
                });
            }
            throw new Error('bad url');
        });
        await expect(api.getSearchResults('test', 1)).resolves.toEqual({
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
        });
    });
});
