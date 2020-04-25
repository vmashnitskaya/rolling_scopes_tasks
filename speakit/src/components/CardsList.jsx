import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardsList = ({ cards, selectedCard, onCardSelected }) => {
    return (
        <div className="cards">
            {cards.map((card) => (
                <Card
                    key={card.word}
                    card={card}
                    onCardSelected={onCardSelected}
                    isSelected={selectedCard && card.word === selectedCard.word}
                />
            ))}
        </div>
    );
};

CardsList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            word: PropTypes.string.isRequired,
            transcription: PropTypes.string.isRequired,
            audio: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedCard: PropTypes.shape({
        word: PropTypes.string.isRequired,
        transcription: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
    }),
};

export default CardsList;
