import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, text }) => {
    return (
        <button className={className} type="button">
            {text}
        </button>
    );
};

Button.propTypes = {};

export default Button;
