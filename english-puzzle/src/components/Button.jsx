import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, text, onClick }) => (
    <button className={className} type="button" onClick={onClick}>
        {text}
    </button>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
