import React from 'react';
import PropTypes from 'prop-types';

const GameBoxWordStatic = ({ text, style }) => {
    return (
        <div className="game__box-word static" style={style}>
            {text}
        </div>
    );
};

GameBoxWordStatic.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.shape({
        width: PropTypes.string.isRequired,
    }).isRequired,
};

export default GameBoxWordStatic;
