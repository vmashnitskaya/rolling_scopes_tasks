import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

const Hints = ({ handleAutoEnabledChecked, handlePronunciationHintChecked, handleImageHintChecked, handleTranslationHintChecked, options }) => {
    return (
        <div className="header__checkboxes">
            <Checkbox
                className="material-icons control"
                id="music_note"
                text="music_note"
                checked={options.autoSoundEnabled}
                onChange={handleAutoEnabledChecked}
            />
            <Checkbox
                className="material-icons control"
                id="volume_up"
                text="volume_up"
                checked={options.soundEnabled}
                onChange={handlePronunciationHintChecked}
            />
            <Checkbox
                className="material-icons control"
                id="insert_photo"
                text="insert_photo"
                checked
                onChange={handleImageHintChecked}
            />
            <Checkbox
                className="material-icons control"
                id="translate"
                text="translate"
                checked={options.translationShown}
                onChange={handleTranslationHintChecked}
            />
        </div>
    )
}

Hints.prototype = {
    handleAutoEnabledChecked: PropTypes.func.isRequired,
    handlePronunciationHintChecked: PropTypes.func.isRequired,
    handleImageHintChecked: PropTypes.func.isRequired,
    handleTranslationHintChecked: PropTypes.func.isRequired,
    options: PropTypes.shape({
        translationShown: PropTypes.bool.isRequired,
        soundEnabled: PropTypes.bool.isRequired,
        autoSoundEnabled: PropTypes.bool.isRequired
    })
}

export default Hints