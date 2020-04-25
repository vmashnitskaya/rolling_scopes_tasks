import React from 'react';
import PropTypes from 'prop-types';
import clcx from 'clsx';

const ComplexityPoints = ({ complexityArray, currentComplexity, onComplexityChange }) => {
    const handleClick = (event) => {
        onComplexityChange(Number(event.target.dataset.complexity));
    };
    return (
        <ul className="points">
            {complexityArray.map((complexity) => (
                <li
                    key={complexity}
                    className={clcx('point', complexity === currentComplexity && 'currentPoint')}
                    data-complexity={complexity}
                    onClick={handleClick}
                />
            ))}
        </ul>
    );
};

ComplexityPoints.propTypes = {
    complexityArray: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentComplexity: PropTypes.number.isRequired,
    onComplexityChange: PropTypes.func.isRequired,
};

export default ComplexityPoints;
