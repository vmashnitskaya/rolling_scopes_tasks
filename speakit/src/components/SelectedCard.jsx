import React from 'react';
import PropTypes from 'prop-types';

const SelectedCard = ({ image, word }) => {
    return (
        <>
            <div className="image">
                <img src={image} alt={word} />
            </div>
            <div className="translation">{word}</div>
        </>
    );
};

SelectedCard.propTypes = {
    image: PropTypes.string.isRequired,
    word: PropTypes.string,
};

export default SelectedCard;
