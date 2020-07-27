const createSpeechRecognition = (lang) => {
    let _onResult = null;
    let isStarted = false;
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;

    if (lang === 'en') {
        recognition.lang = 'en-US';
    } else {
        recognition.lang = 'ru-RU';
    }

    const onStart = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        _onResult(transcript);
    };

    const onEnd = () => {
        if (isStarted === true) {
            recognition.start();
        }
    };

    recognition.addEventListener('result', onStart);
    recognition.addEventListener('end', onEnd);

    return {
        start: (onResult) => {
            _onResult = onResult;
            isStarted = true;
            recognition.start();
        },
        stop: () => {
            isStarted = false;
            recognition.stop();
        },
        isStarted: () => isStarted,
    };
};

export default createSpeechRecognition;
