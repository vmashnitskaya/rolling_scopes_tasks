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

const getTranslation = async (word) => {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T170620Z.55c8b9394267ab3a.3447d744700d3f2e8e6216551e211e2089052f54&text=${word}&lang=en-ru`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text.map((translation) => translation.toLowerCase())[0];
};

const recognizeSpeech = (onResult) => {
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        onResult(transcript);
    });

    recognition.addEventListener('end', recognition.start);

    recognition.start();
};

export default {
    getCards,
    getTranslation,
    recognizeSpeech,
};
