import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const GameBoxWord = ({ className, text, style, onClick }) => {
    const handleClick = (event) => {
        onClick(event.target.innerHTML);
    };
    return (
        <div className={clsx('game__box-word', `${className}`)} style={style} onClick={handleClick}>
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
};

export default GameBoxWord;
