import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ className, id, text, checked }) => (
    <>
        <input id={id} type="checkbox" value={text} checked={checked} />
        <label htmlFor={text} className={className}>
            {id}
        </label>
    </>
);

Checkbox.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default Checkbox;
