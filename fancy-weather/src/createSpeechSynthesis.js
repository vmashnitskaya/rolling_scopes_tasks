import localizationMessages from './localizationMessages';

const voiceIndexes = {
    en: 4,
    ru: 17,
    be: 17,
};

const getVoices = () => {
    return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }
        speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            resolve(voices);
        };
    });
};

const createSpeechSynthesis = async (lang) => {
    const voices = await getVoices();
    const voice = voices[voiceIndexes[lang]];

    return {
        speak: (data, unit) => {
            const msg = new SpeechSynthesisUtterance();
            msg.voice = voice;
            msg.text = localizationMessages[lang](data, unit);
            window.speechSynthesis.speak(msg);
        },
        cancel: () => {
            window.speechSynthesis.cancel();
        },
    };
};

export default createSpeechSynthesis;
