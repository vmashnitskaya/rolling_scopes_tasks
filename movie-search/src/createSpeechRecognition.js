const createSpeechRecognition = () => {
    let _onResult = null;
    let isStarted = false;
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const onStart = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        _onResult(transcript);
    };

    const onEnd = () => {
        isStarted = false;
    };

    recognition.addEventListener('result', onStart);
    recognition.addEventListener('end', onEnd);

    return {
        start: (onResult) => {
            _onResult = onResult;
            isStarted = true;
            recognition.start();
        },
        abort: () => {
            isStarted = false;
            recognition.abort();
        },
        isStarted: () => isStarted,
    };
};

export default createSpeechRecognition;
