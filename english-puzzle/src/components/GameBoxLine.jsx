import React from 'react';
import PropTypes from 'prop-types';
import GameBoxWord from './GameBoxWord';

const GameBoxLine = ({ shuffledArray, length, onWordSelected }) => {
    const arrayOfWords = shuffledArray.slice(0);
    const wordWidth = parseFloat(100 / length).toFixed(2);
    return (
        <div className="game__box-line">
            {arrayOfWords.map((word, index) => (
                <GameBoxWord
                    key={index}
                    text={word}
                    style={{ width: `${wordWidth}%` }}
                    onClick={onWordSelected}
                />
            ))}
        </div>
    );
};

GameBoxLine.propTypes = {
    shuffledArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    length: PropTypes.number.isRequired,
};

export default GameBoxLine;
