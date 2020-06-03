import React, { useMemo, useState, useEffect } from 'react';
import api from '../api';
import Checkbox from './Checkbox';
import DropDown from './DropDown';
import Button from './Button';
import GameBoxLine from './GameBoxLine';
import GameGuessArea from './GameGuessArea';
import Translation from './Translation';

const maxLevel = 6;
const maxOption = 60;

const GamePage = () => {
    const [level, setLevel] = useState(0);
    const [option, setOption] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentGuessedWords, setCurrentGuessedWords] = useState([]);
    const [guessedArrays, setGuessedArrays] = useState([]);
    const [currentShuffledArray, setCurrentShuffledArray] = useState([]);
    const [currentOriginalArray, setCurrentOriginalArray] = useState([]);
    const [showOriginalArray, setShowOriginalArray] = useState(false);
    const [differenceIndexes, setDifferenceIndexes] = useState([]);
    const [gameInProgress, setGameInProgress] = useState(true);
    const [readyForReview, setReadyForReview] = useState(false);
    const [readyForContinue, setReadyForContinue] = useState(false);
    const [translation, setTranslation] = useState('');
    const [translationShown, setTranslationShown] = useState(false);

    const levelOptions = useMemo(
        () =>
            Array.from({ length: maxLevel }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );
    const optionOptions = useMemo(
        () =>
            Array.from({ length: maxOption }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );
    const handleLevelChange = (event) => setLevel(event.target.value);
    const handleOptionChange = (event) => setOption(event.target.value);

    useEffect(() => {
        setLoading(true);
        api.getSentences(level, option)
            .then(setData)
            .then(() => setLoading(false));
    }, [level, option]);

    useEffect(() => {
        if (data.length) {
            setCurrentGuessedWords(data[currentLine].guessedArray);
            setCurrentShuffledArray(data[currentLine].shuffledArray);
            setCurrentOriginalArray(data[currentLine].originalArray);
            setTranslation(data[currentLine].translation);
        }
    }, [data, currentLine]);

    useEffect(() => {
        if (data.length) {
            if (currentGuessedWords.length === data[currentLine].sentenceLength) {
                setGameInProgress(false);
            } else {
                setGameInProgress(true);
            }
        }
    }, [currentGuessedWords, currentLine, data]);

    const handleCheckboxChecked = () => {};

    const handleWordGuessed = (word) => {
        setCurrentGuessedWords((prevState) => [...prevState, word]);
        setCurrentShuffledArray(currentShuffledArray.filter((el) => el !== word));
    };

    const handleWordPassed = (word) => {
        setCurrentShuffledArray((prevState) => [...prevState, word]);
        setCurrentGuessedWords(currentGuessedWords.filter((el) => el !== word));
    };

    const checkGuessingResult = () => {
        currentGuessedWords.forEach((word, index) => {
            if (word !== currentOriginalArray[index]) {
                setDifferenceIndexes((prevState) => [...prevState, index]);
                setReadyForContinue(true);
            } else {
                setReadyForContinue(true);
            }
        });
        setReadyForReview(true);
    };

    const showAnswer = () => {
        setShowOriginalArray(true);
        setGameInProgress(false);
        setCurrentGuessedWords(currentOriginalArray);
        setCurrentShuffledArray([]);
    };

    const continueGame = () => {
        if (currentLine < 10) {
            setGuessedArrays((prevState) => [...prevState, currentGuessedWords]);
            setCurrentLine((prevState) => prevState + 1);
        }
    };

    return (
        <div className="game-page">
            <div className="container">
                <div className="header">
                    <div className="header__drop-downs">
                        <DropDown
                            name="level"
                            label="Level"
                            value={level}
                            options={levelOptions}
                            onChange={handleLevelChange}
                        />
                        <DropDown
                            name="page"
                            label="Page"
                            value={option}
                            options={optionOptions}
                            onChange={handleOptionChange}
                        />
                    </div>
                    <div className="header__checkboxes">
                        <Checkbox
                            className="material-icons control"
                            id="music_note"
                            text="music_note"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                        <Checkbox
                            className="material-icons control"
                            id="volume_up"
                            text="volume_up"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                        <Checkbox
                            className="material-icons control"
                            id="insert_photo"
                            text="insert_photo"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                        <Checkbox
                            className="material-icons control"
                            id="translate"
                            text="translate"
                            checked
                            onChange={handleCheckboxChecked}
                        />
                    </div>
                </div>
                <div className="main game">
                    <Translation text={translation} translationShown={translationShown} />
                    {loading ? (
                        'loading'
                    ) : (
                        <>
                            <div className="game__box">
                                {guessedArrays.map((array, index) => (
                                    <GameBoxLine
                                        key={index}
                                        guessedArray={array}
                                        length={array.length}
                                        onWordClick={handleWordPassed}
                                        readyForReview={readyForReview}
                                        differenceIndexes={differenceIndexes}
                                    />
                                ))}
                                {guessedArrays.length !== 10 && (
                                    <GameBoxLine
                                        guessedArray={currentGuessedWords}
                                        length={data[currentLine].sentenceLength}
                                        onWordClick={handleWordPassed}
                                        readyForReview={readyForReview}
                                        differenceIndexes={differenceIndexes}
                                    />
                                )}
                            </div>
                            <div className="game__guess-area">
                                <GameGuessArea
                                    array={currentShuffledArray}
                                    length={data[currentLine].sentenceLength}
                                    onClick={handleWordGuessed}
                                />
                            </div>
                        </>
                    )}
                    <div className="game__buttons">
                        {gameInProgress && !readyForContinue && (
                            <Button className="not-know" text="I don't know" onClick={showAnswer} />
                        )}
                        {!gameInProgress && !readyForContinue && (
                            <Button className="check" text="Check" onClick={checkGuessingResult} />
                        )}
                        {!gameInProgress && readyForContinue && (
                            <Button className="continue" text="Continue" onClick={continueGame} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

GamePage.propTypes = {};

export default GamePage;
