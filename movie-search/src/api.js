const apiKey = '1adbf2cc';

const getRate = async (id) => {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    return data.imdbRating;
};

const getSearchResults = async (searchValue, page) => {
    const url = encodeURI(
        `https://www.omdbapi.com/?s=${searchValue.trim()}&page=${page}&apikey=${apiKey}`
    );

    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const {Search, totalResults, Response} = await res.json();

    if (Response === 'True') {
        const ratings = await Promise.all(Search.map(({imdbID}) => getRate(imdbID)));

        return {
            data: Search.map((movie, index) => ({...movie, rating: ratings[index]})),
            totalResults,
            page,
        };
    }
    return {
        data: [],
        totalResults: 0,
        page,
    };
};

const getSearchTranslation = async (searchText) => {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T170620Z.55c8b9394267ab3a.3447d744700d3f2e8e6216551e211e2089052f54&lang=ru-en&text=${searchText}`;
    const res = await window.fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    return data.text[0];
};

export default {
    getSearchResults,
    getSearchTranslation,
};
