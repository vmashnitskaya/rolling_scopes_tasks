import React from 'react';
import PropTypes from 'prop-types';

const GameBox = ({ className }) => {
    return <div className={className} />;
};

GameBox.propTypes = {
    className: PropTypes.string.isRequired,
};

export default GameBox;
