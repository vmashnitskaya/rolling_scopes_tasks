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

export default {
    getSearchResults,
};
