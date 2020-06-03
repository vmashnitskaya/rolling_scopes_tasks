import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const GameGuessArea = ({ array, length, differenceIndexes }) => {
    const width = parseFloat(100 / length).toFixed(2);
    return array.map((element, index) => (
        <div
            key={index}
            className={clsx('guessed', differenceIndexes.includes(index) && 'red')}
            style={{ width: `${width}%` }}
        >
            {element}
        </div>
    ));
};

GameGuessArea.propTypes = {
    array: PropTypes.arrayOf(PropTypes.string).isRequired,
    length: PropTypes.number.isRequired,
    differenceIndexes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default GameGuessArea;
