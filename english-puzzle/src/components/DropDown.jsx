import React from 'react';
import PropTypes from 'prop-types';

const DropDown = ({ className, name, label, value, options, onChange }) => {
    return (
        <div className="dropdown">
            <label htmlFor={name}>{label}</label>
            <select
                className={className}
                name={name}
                id={name}
                aria-label={label}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

DropDown.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
};

DropDown.defaultProps = {
    className: '',
};

export default DropDown;
