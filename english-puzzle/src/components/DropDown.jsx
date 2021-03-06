import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const DropDown = ({ className, name, label, value, level, options, onChange, passed }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (
        <div className="dropdown">
            <label htmlFor={name}>{label}</label>
            <select
                className={className}
                name={name}
                id={name}
                aria-label={label}
                value={value}
                onChange={handleChange}
            >
                {options.map((option) => {
                    return (
                        <option
                            key={option.value}
                            value={option.value}
                            className={clsx(
                                className === 'page' &&
                                    passed &&
                                    passed[level].includes(option.value) &&
                                    'passed',
                                className === 'level' &&
                                    passed &&
                                    passed.includes(option.value) &&
                                    'passed'
                            )}
                        >
                            {option.text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

DropDown.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
    passed: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
    ]).isRequired,
    level: PropTypes.number.isRequired,
};

DropDown.defaultProps = {
    className: '',
};

export default DropDown;
