import React from 'react';
import PropTypes from 'prop-types';

const SelectedCard = ({ image, word, translation }) => {
    return (
        <>
            <div className="image">
                <img src={image} alt={word} />
            </div>
            <div className="translation">{translation}</div>
        </>
    );
};

SelectedCard.propTypes = {
    image: PropTypes.string.isRequired,
    word: PropTypes.string,
    translation: PropTypes.string,
};

SelectedCard.defaultProps = {
    word: 'image',
    translation: '\u00a0',
};

export default SelectedCard;
