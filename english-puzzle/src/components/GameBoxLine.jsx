import React from 'react';
import PropTypes from 'prop-types';
import GameBoxWord from './GameBoxWord';

const GameBoxLine = ({ guessedArray, length, onWordClick, readyForReview, differenceIndexes }) => {
    const arrayOfWords = guessedArray.slice(0);
    const wordWidth = parseFloat(100 / length).toFixed(2);

    const checkColors = (index) => {
        if (readyForReview === true) {
            if (differenceIndexes.includes(index)) {
                return 'coloredRed';
            }
            return 'coloredGreen';
        }
        return '';
    };
    return (
        <>
            <div className="game__box-line">
                {arrayOfWords.map((word, index) => (
                    <GameBoxWord
                        className={checkColors(index)}
                        key={index}
                        text={word}
                        index={index}
                        style={{ width: `${wordWidth}%` }}
                        onClick={onWordClick}
                    />
                ))}
            </div>
        </>
    );
};

GameBoxLine.propTypes = {
    guessedArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    length: PropTypes.number.isRequired,
    onWordClick: PropTypes.func.isRequired,
    readyForReview: PropTypes.bool.isRequired,
    differenceIndexes: PropTypes.arrayOf(PropTypes.number),
};

GameBoxLine.defaultProps = {
    differenceIndexes: [],
};

export default GameBoxLine;
