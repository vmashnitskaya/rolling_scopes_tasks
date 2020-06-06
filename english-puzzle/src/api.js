const formatUrl = (url) =>
    `https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/${url.split('/')[1]}`;

const getTranslations = async (sentencesForTranslation) => {
    const translations = await Promise.all(
        sentencesForTranslation
            .map((sentence) =>
                encodeURI(
                    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T170620Z.55c8b9394267ab3a.3447d744700d3f2e8e6216551e211e2089052f54&lang=en-ru&text=${sentence}`
                )
            )
            .map((url) => fetch(url).then((res) => res.json()))
    );
    return translations.map((translation) => translation.text.join(''));
};

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const getSentences = async (level, option) => {
    const page = Math.floor(option / 2);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
    const res = await window.fetch(url, { method: 'GET' });
    const json = await res.json();
    const currectSet = option % 2 ? json.slice(10, 20) : json.slice(0, 10);
    const sentences = currectSet.map(({ textExample, audioExample }) => {
        const sentence = textExample.replace(/<\/?[^>]+(>|$)/g, '');
        const shuffledArray = shuffle(sentence.slice(0).split(' '));
        const originalArray = sentence.slice(0).split(' ');
        return {
            text: sentence,
            pronunciation: formatUrl(audioExample),
            shuffledArray,
            originalArray,
            guessedArray: [],
            sentenceLength: sentence.split(' ').length,
        };
    });

    const sentencesForTranslation = sentences.slice(0).map((element) => element.text);
    const translations = await getTranslations(sentencesForTranslation);
    translations.forEach((translation, index) => {
        sentences[index].translation = translation;
    });

    console.log(sentences);
    return sentences;
};

export default {
    getSentences,
};
