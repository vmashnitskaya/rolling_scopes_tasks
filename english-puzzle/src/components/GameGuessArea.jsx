import React from 'react';
import PropTypes from 'prop-types';

const GameGuessArea = ({ array, length, onClick }) => {
    const handleClick = (event) => {
        onClick(event.target.dataset.word, event.target.dataset.index);
    };

    const returnCorrectTags = (element) => {
        if (element.first === true) {
            return (
                <>
                    <span className="r" />
                    <span className="text">{element.word}</span>
                </>
            );
        }
        if (element.last === true) {
            return (
                <>
                    <span className="t" />
                    <span className="text">{element.word}</span>
                </>
            );
        }
        return (
            <>
                <span className="r" />
                <span className="l" />
                <span className="text">{element.word}</span>
            </>
        );
    };
    const width = parseFloat(100 / length).toFixed(2) - 1.5;
    return array.map((element, index) => (
        <div
            key={index}
            data-word={element.word}
            className="guessed-word"
            style={{ width: `${width}%` }}
            onClick={handleClick}
            data-index={index}
        >
            {returnCorrectTags(element, index)}
        </div>
    ));
};

GameGuessArea.propTypes = {
    array: PropTypes.shape({
        word: PropTypes.string,
        order: PropTypes.number,
        first: PropTypes.bool,
        last: PropTypes.bool,
    }).isRequired,
    length: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default GameGuessArea;
