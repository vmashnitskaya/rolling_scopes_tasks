const formatUrl = (url) =>
    'https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/' + url.split('/')[1];

const getCards = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await window.fetch(url, { method: 'GET' });
    const json = await res.json();
    const cards = json.map(({ word, image, audio, transcription }) => ({
        word,
        image: formatUrl(image),
        audio: formatUrl(audio),
        transcription,
    }));
    return cards;
};

async function getTranslation(word) {
    const url =
        'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=&{word} &lang=en-ru';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.text);
}

export default {
    getCards,
};
