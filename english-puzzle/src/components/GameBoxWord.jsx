import React from 'react';
import PropTypes from 'prop-types';

const GameBoxWord = ({ text, style, onClick }) => {
    const handleClick = () => {
        onClick(text);
    };

    return (
        <div className="game__box-word" style={style} onClick={handleClick}>
            {text}
        </div>
    );
};

GameBoxWord.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.shape({
        width: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default GameBoxWord;
