import React from 'react';
import PropTypes from 'prop-types';

const SpeechRecognitionText = ({ text }) => {
    return <div className="text">{text}</div>;
};

SpeechRecognitionText.propTypes = {
    text: PropTypes.string,
};

SpeechRecognitionText.defaultProps = {
    text: '\u00a0',
};

export default SpeechRecognitionText;
