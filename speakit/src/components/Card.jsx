import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SoundIcon } from '../img/sound.svg';
import clsx from 'clsx';

const Card = ({ card, isSelected, onCardSelected }) => {
    const audioRef = useRef();
    const handleClick = () => {
        audioRef.current.play();
        onCardSelected(card);
    };

    return (
        <div className={clsx('card', isSelected && 'selected')} onClick={handleClick}>
            <SoundIcon className="card__sound" />
            <div className="card__description">
                <p className="card__description-word">{card.word}</p>
                <p className="card__description-transcription">{card.transcription}</p>
                <audio ref={audioRef} src={card.audio} type="audio/mpeg" />
            </div>
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.shape({
        word: PropTypes.string.isRequired,
        transcription: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
    }).isRequired,
    onCardSelected: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};

export default Card;
