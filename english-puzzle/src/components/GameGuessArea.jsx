import React from 'react';
import PropTypes from 'prop-types';

const GameGuessArea = ({ array, length, onClick }) => {
    const handleClick = (event) => {
        onClick(event.target.innerHTML);
    };
    const width = parseFloat(100 / length).toFixed(2);
    return array.map((element, index) => (
        <div
            key={index}
            className="guessed-word"
            style={{ width: `${width}%` }}
            onClick={handleClick}
        >
            {element}
        </div>
    ));
};

GameGuessArea.propTypes = {
    array: PropTypes.arrayOf(PropTypes.string).isRequired,
    length: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default GameGuessArea;
