import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';



const GameBox = ({ data }) => {
    const [dataArray, setDataArray] = useState([...data]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentGuessedWords, setCurrentGuessedWords] = useState(
        dataArray[currentLine].guessedArray
    );
    const [currentShuffledArray, setCurrentShuffledArray] = useState(
        dataArray[currentLine].shuffledArray
    );
    const [differenceIndexes, setDifferenceIndexes] = useState([]);

    
    return (
        <>
            <div className="game__box">
                <GameBoxLine
                    guessedArray={currentGuessedWords}
                    length={dataArray[currentLine].sentenceLength}
                    onWordClick={handleWordPassed}
                />
            </div>

            
        </>
    );
};

GameBox.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameBox;
