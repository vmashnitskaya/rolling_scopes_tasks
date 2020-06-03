import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameBoxLine from './GameBoxLine';
import GameGuessArea from './GameGuessArea';

const GameBox = ({ data }) => {
    const [dataArray, setDataArray] = useState([...data]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentGuessedWords, setCurrentGuessedWords] = useState(
        dataArray[currentLine].guessedArray
    );
    const [differenceIndexes, setDifferenceIndexes] = useState([]);

    useEffect(() => {
        if (currentGuessedWords.length >= dataArray[currentLine].sentenceLength) {
            const newDifferenceIndexes = [];
            currentGuessedWords.forEach((element, index) => {
                if (element !== dataArray[index].originalArray) {
                    newDifferenceIndexes.push(index);
                }
            });
            setDifferenceIndexes(newDifferenceIndexes);
        }
    }, [currentGuessedWords]);

    const handleWordGuessed = (word) => {
        setCurrentGuessedWords((prevState) => [...prevState, word]);
    };

    return (
        <>
            <div className="game__box">
                {dataArray.map((lineSentence, index) => (
                    <GameBoxLine
                        key={index}
                        shuffledArray={lineSentence.shuffledArray}
                        length={lineSentence.sentenceLength}
                        onWordSelected={handleWordGuessed}
                    />
                ))}
            </div>
            <div className="game__guess-area">
                <GameGuessArea
                    array={currentGuessedWords}
                    length={dataArray[currentLine].sentenceLength}
                    differenceIndexes={differenceIndexes}
                />
            </div>
        </>
    );
};

GameBox.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameBox;
