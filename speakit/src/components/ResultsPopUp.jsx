import React from 'react';
import PopUp from './PopUp';
import ResultCard from './ResultCard';
import Button from './Button';

const ResultsPopUp = ({ open, cards, guessedCards, onClose, onNewGame }) => {
    return (
        <PopUp open={open}>
            <div className="results">
                <div className="results-title">Successfull:</div>
                <div className="results-list successfull-results">
                    {cards
                        .filter((card) => guessedCards.includes(card.word))
                        .map(({ word, translation, transcription, audio }) => (
                            <ResultCard
                                key={word}
                                word={word}
                                translation={translation}
                                transcription={transcription}
                                audio={audio}
                            />
                        ))}
                </div>
                <div className="results-title">Errors:</div>
                <div className="results-list error-results">
                    {cards
                        .filter((card) => !guessedCards.includes(card.word))
                        .map(({ word, translation, transcription, audio }) => (
                            <ResultCard
                                key={word}
                                word={word}
                                translation={translation}
                                transcription={transcription}
                                audio={audio}
                            />
                        ))}
                </div>
                <div className="results-actions">
                    {guessedCards.length !== 10 && (
                        <Button className="resume-button" text="Resume game" onClick={onClose} />
                    )}
                    <Button className="new-game" text="New game" onClick={onNewGame} />
                </div>
            </div>
        </PopUp>
    );
};

export default ResultsPopUp;
