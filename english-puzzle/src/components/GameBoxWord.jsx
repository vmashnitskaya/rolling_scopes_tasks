import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const GameBoxWord = ({ className, text, index, style, onClick }) => {
    const handleClick = () => {
        onClick(text, index);
    };
    return (
        <div
            className={clsx('game__box-word', `${className}`)}
            index={index}
            style={style}
            onClick={handleClick}
        >
            {text}
        </div>
    );
};

GameBoxWord.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    style: PropTypes.shape({
        width: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default GameBoxWord;
