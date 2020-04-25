const getCards = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await window.fetch(url, { method: 'GET' });
    const json = await res.json();
    const cards = json.map(({ word, image, audio, transcription }) => ({
        word,
        image,
        audio,
        transcription,
    }));
    return cards;
};

export default {
    getCards,
};
