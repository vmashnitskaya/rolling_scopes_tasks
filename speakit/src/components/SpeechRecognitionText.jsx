import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Microfon } from '../img/microfon.svg';

const SpeechRecognitionText = ({ text }) => {
    return <div className="recognition">
        <Microfon className="microfon"/>
        <div className="text">{text}</div>
        </div>;
};

SpeechRecognitionText.propTypes = {
    text: PropTypes.string,
};

SpeechRecognitionText.defaultProps = {
    text: '\u00a0',
};

export default SpeechRecognitionText;
