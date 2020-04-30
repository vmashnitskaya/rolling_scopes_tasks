const createSpeechRecognition = () => {
    let _onResult = null;
    let isStarted = false;
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const onStart = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        console.log(transcript);
        _onResult(transcript);
    };

    const onEnd = () => {
        if (isStarted) {
            recognition.start();
        }
    };

    return {
        start: (onResult) => {
            _onResult = onResult;
            isStarted = true;
            recognition.addEventListener('result', onStart);
            recognition.addEventListener('end', onEnd);
            recognition.start();
        },
        abort: () => {
            isStarted = false;
            recognition.removeEventListener('result', onStart);
            recognition.removeEventListener('end', onEnd);
            recognition.abort();
        },
        isStarted: () => isStarted,
    };
};

export default createSpeechRecognition;
