import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardsList = ({ tempCards }) => {
    return (
        <div className="cards">
            {tempCards.map((card) => (
                <Card word={card.word} transcription={card.transcription} audio={card.audio} />
            ))}
        </div>
    );
};

CardsList.propTypes = {
    tempCards: PropTypes.arrayOf(
        PropTypes.shape({
            word: PropTypes.string.isRequired,
            transcription: PropTypes.string.isRequired,
            audio: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardsList;
