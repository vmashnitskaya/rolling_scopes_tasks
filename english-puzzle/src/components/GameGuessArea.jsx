import React from 'react';
import PropTypes from 'prop-types';
import PuzzleComponentSpan from './PuzzleComponentSpan';

const GameGuessArea = ({ array, length, onClick }) => {
    const handleClick = (event) => {
        onClick(event.target.dataset.word, event.target.dataset.index);
    };

    const returnCorrectTags = (element, index) => {
        if (element.first === true) {
            return (
                <>
                    <PuzzleComponentSpan className="r" index={index} word={element.word} />
                    <PuzzleComponentSpan className="text" index={index} word={element.word} />
                </>
            );
        }
        if (element.last === true) {
            return (
                <>
                    <PuzzleComponentSpan className="l" index={index} word={element.word} />
                    <PuzzleComponentSpan className="text" index={index} word={element.word} />
                </>
            );
        }
        return (
            <>
                <PuzzleComponentSpan className="r" index={index} word={element.word} />
                <PuzzleComponentSpan className="l" index={index} word={element.word} />
                <PuzzleComponentSpan className="text" index={index} word={element.word} />
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
    array: PropTypes.arrayOf(
        PropTypes.shape({
            word: PropTypes.string,
            order: PropTypes.number,
            first: PropTypes.bool,
            last: PropTypes.bool,
        })
    ).isRequired,
    length: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default GameGuessArea;
