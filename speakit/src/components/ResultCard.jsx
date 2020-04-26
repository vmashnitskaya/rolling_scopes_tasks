import React, { useRef } from 'react';
import { ReactComponent as SoundIcon } from '../img/sound.svg';

const ResultCard = ({ word, translation, transcription, audio }) => {
    const audioRef = useRef();

    const handleClick = () => {
        audioRef.current.play();
    };
    return (
        <div className="result-row" onClick={handleClick}>
            <SoundIcon className="sound" />
            <div className="words">
                <div>{word}</div>
                <div>{transcription}</div>
                <div>{translation}</div>
            </div>
            <audio src={audio} ref={audioRef}></audio>
        </div>
    );
};

export default ResultCard;
