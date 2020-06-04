import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clcx from 'clsx';

const Translation = ({ text, audio, options }) => {
    const audioRef = useRef();
    const [audioPlaying, setAudioPlaying] = useState(false)

    const handleClick = () => {
        setAudioPlaying(true);
        audioRef.current.play();
    };

    const hanlePlayedSound = () => {
        setAudioPlaying(false);
    }

    return (
        <div className="game__translation">
            <div className="sound-wrapper">
                <i className={clcx("material-icons", 'sound', audioPlaying && 'active', (options.soundEnabled && options.autoSoundEnabled) || 'hidden')} onClick={handleClick}>volume_up</i>
            </div>
            <audio ref={audioRef} src={audio} type="audio/mpeg" onEnded={hanlePlayedSound} />
            <div className={clcx('translation', options.translationShown || 'hidden')}>{text}</div>
        </div>
    );
};

Translation.propTypes = {
    text: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    options: PropTypes.shape({
        translationShown: PropTypes.bool.isRequired,
        soundEnabled: PropTypes.bool.isRequired,
        autoSoundEnabled: PropTypes.bool.isRequired
    })
};

export default Translation;
