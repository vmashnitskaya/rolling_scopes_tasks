import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clcx from 'clsx';

const Translation = ({ text, audio, options, correctResultEnabledOptions }) => {
    const audioRef = useRef();
    const [audioPlaying, setAudioPlaying] = useState(false);

    const handleClick = useCallback(() => {
        setAudioPlaying(true);
        audioRef.current.play();
    }, []);

    const hanlePlayedSound = () => {
        setAudioPlaying(false);
    };

    useEffect(() => {
        if (correctResultEnabledOptions) {
            handleClick();
        }
    }, [correctResultEnabledOptions, handleClick]);

    return (
        <div className="game__translation">
            <div className="sound-wrapper">
                <i
                    className={clcx(
                        'material-icons',
                        'sound',
                        audioPlaying && 'active',
                        (options.soundEnabled && options.autoSoundEnabled) ||
                            correctResultEnabledOptions ||
                            'hidden'
                    )}
                    onClick={handleClick}
                >
                    volume_up
                </i>
            </div>
            <audio ref={audioRef} src={audio} type="audio/mpeg" onEnded={hanlePlayedSound}>
                <track kind="captions" />
            </audio>
            <div
                className={clcx(
                    'translation',
                    options.translationShown || correctResultEnabledOptions || 'hidden'
                )}
            >
                {text}
            </div>
        </div>
    );
};

Translation.propTypes = {
    text: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    options: PropTypes.shape({
        translationShown: PropTypes.bool,
        soundEnabled: PropTypes.bool,
        autoSoundEnabled: PropTypes.bool,
    }).isRequired,
    correctResultEnabledOptions: PropTypes.bool.isRequired,
};

export default Translation;
