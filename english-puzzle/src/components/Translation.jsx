import React from 'react';
import PropTypes from 'prop-types';
import clcx from 'clsx';

const Translation = ({ text, translationShown }) => {
    return (
        <div className={clcx('game__translation', translationShown || 'hidden')}>
            <i className="material-icons">volume_up</i>
            <div className="translation">{text}</div>
        </div>
    );
};

Translation.propTypes = {
    text: PropTypes.string.isRequired,
    translationShown: PropTypes.bool.isRequired,
};

export default Translation;
