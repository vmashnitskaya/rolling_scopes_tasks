import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SoundIcon } from '../img/sound.svg';

const Card = ({ word, transcription, audio }) => {
    return (
        <div className="card">
            <SoundIcon className="card__sound" />
            <div className="card__description">
                <p className="card__description-word">{word}</p>
                <p className="card__description-transcription">{transcription}</p>
                <audio src={audio}></audio>
            </div>
        </div>
    );
};

Card.propTypes = {
    word: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
};

export default Card;
