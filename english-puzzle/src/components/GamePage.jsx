import React, { useMemo, useState, useEffect } from 'react';
import api from '../api';
import DropDown from './DropDown';
import Button from './Button';
import GameBoxLine from './GameBoxLine';
import GameGuessArea from './GameGuessArea';
import Translation from './Translation';
import GameBoxLineStatic from './GameBoxLineStatic';
import Hints from './Hints';

const maxLevel = 5;
const maxOption = 59;
const optionsPassedObject = Array.from({ length: maxLevel + 1 }, (_, i) => i).reduce(
    (acc, el) => ({ ...acc, [el]: [] }),
    {}
);

const GamePage = () => {
    const [{ level, option }, setPagination] = useState(
        localStorage.getItem('pagination')
            ? JSON.parse(localStorage.getItem('pagination'))
            : { level: 0, option: 0 }
    );
    const [levelPassed, setlevelPassed] = useState([]);
    const [optionsPassed, setOptionsPassed] = useState(optionsPassedObject);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentGuessedWords, setCurrentGuessedWords] = useState([]);
    const [guessedArrays, setGuessedArrays] = useState([]);
    const [currentShuffledArray, setCurrentShuffledArray] = useState([]);
    const [currentOriginalArray, setCurrentOriginalArray] = useState([]);
    const [showOriginalArray, setShowOriginalArray] = useState(false);
    const [soundLink, setSoundLink] = useState('');

    const [differenceIndexes, setDifferenceIndexes] = useState([]);

    const [gameInProgress, setGameInProgress] = useState(true);
    const [readyForReview, setReadyForReview] = useState(false);
    const [readyForContinue, setReadyForContinue] = useState(false);

    const [translation, setTranslation] = useState('');

    const [options, setOptions] = useState(
        localStorage.getItem('optionsObject')
            ? JSON.parse(localStorage.getItem('optionsObject'))
            : {
                  translationShown: true,
                  soundEnabled: true,
                  autoSoundEnabled: true,
              }
    );

    const levelOptions = useMemo(
        () =>
            Array.from({ length: maxLevel + 1 }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );
    const optionOptions = useMemo(
        () =>
            Array.from({ length: maxOption + 1 }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );

    const handleLevelChange = (event) =>
        setPagination((prevState) => ({ ...prevState, level: Number(event.target.value) }));

    const handleOptionChange = (event) =>
        setPagination((prevState) => ({ ...prevState, option: Number(event.target.value) }));

    useEffect(() => {
        setLoading(true);
        setCurrentLine(0);
        setGuessedArrays([]);
        api.getSentences(level, option)
            .then(setData)
            .then(() => setLoading(false));
        localStorage.setItem('pagination', JSON.stringify({ level, option }));
    }, [level, option]);

    useEffect(() => {
        if (data.length) {
            setCurrentOriginalArray(data[currentLine].originalArray);
            setTranslation(data[currentLine].translation);
            setReadyForContinue(false);
            setReadyForReview(false);
            setCurrentGuessedWords(data[currentLine].guessedArray);
            setCurrentShuffledArray(data[currentLine].shuffledArray);
            setDifferenceIndexes([]);
            setSoundLink(data[currentLine].pronunciation);
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

    useEffect(() => {
        localStorage.setItem('optionsObject', JSON.stringify(options));
    }, [options]);

    const handleWordGuessed = (word, index) => {
        setCurrentGuessedWords((prevState) => [...prevState, word]);
        setCurrentShuffledArray((prevState) => {
            const state = [...prevState];
            state.splice(index, 1);
            return state;
        });
    };

    const handleWordPassed = (word, index) => {
        setCurrentShuffledArray((prevState) => [...prevState, word]);
        setCurrentGuessedWords((prevState) => {
            const state = [...prevState];
            state.splice(index, 1);
            return state;
        });
    };

    const checkGuessingResult = () => {
        currentGuessedWords.forEach((word, index) => {
            if (word !== currentOriginalArray[index]) {
                setDifferenceIndexes((prevState) => [...prevState, index]);
            }
        });
        setReadyForContinue(true);
        setReadyForReview(true);
    };

    const showAnswer = () => {
        setShowOriginalArray(true);
        setGameInProgress(false);
        setCurrentGuessedWords(currentOriginalArray);
        setCurrentShuffledArray([]);
    };

    const startNewLevel = () => {
        if (option < maxOption) {
            setPagination((prevState) => ({ ...prevState, option: prevState.option + 1 }));
        } else if (level < maxLevel) {
            setPagination((prevState) => ({ option: 0, level: prevState.level + 1 }));
        } else {
            setPagination({ level: 0, option: 0 });
        }
    };

    useEffect(() => {
        if (readyForContinue === true && optionsPassed[level - 1].length === maxOption) {
            setOptionsPassed((prevState) => ({
                ...prevState,
                [level]: [...prevState[level], maxOption],
            }));
            setlevelPassed((prevState) => [...prevState, level - 1]);
        }
    }, [level]);

    useEffect(() => {
        if (readyForContinue === true) {
            setOptionsPassed((prevState) => ({
                ...prevState,
                [level]: [...prevState[level], option - 1],
            }));
        }
    }, [option]);

    const continueGame = () => {
        if (currentLine < 9) {
            setGuessedArrays((prevState) => [...prevState, currentGuessedWords]);
            setCurrentLine((prevState) => prevState + 1);
        } else {
            startNewLevel();
        }
    };

    const enableAutoPronunciation = () => {
        setOptions((prevState) => ({
            ...prevState,
            autoSoundEnabled: !prevState.autoSoundEnabled,
        }));
    };

    const enablePronunciation = () => {
        setOptions((prevState) => ({ ...prevState, soundEnabled: !prevState.soundEnabled }));
    };

    const enableImage = () => {};

    const enableTranslation = () => {
        setOptions((prevState) => ({
            ...prevState,
            translationShown: !prevState.translationShown,
        }));
    };

    return (
        <div className="game-page">
            <div className="container">
                <div className="header">
                    <div className="header__drop-downs">
                        <DropDown
                            className="level"
                            name="level"
                            label="Level"
                            value={level}
                            options={levelOptions}
                            onChange={handleLevelChange}
                            level={level}
                            passed={levelPassed}
                        />
                        <DropDown
                            className="page"
                            name="page"
                            label="Page"
                            value={option}
                            options={optionOptions}
                            onChange={handleOptionChange}
                            level={level}
                            passed={optionsPassed}
                        />
                    </div>
                    <Hints
                        handleAutoEnabledChecked={enableAutoPronunciation}
                        handlePronunciationHintChecked={enablePronunciation}
                        handleImageHintChecked={enableImage}
                        handleTranslationHintChecked={enableTranslation}
                        options={options}
                    />
                </div>
                <div className="main game">
                    <Translation text={translation} audio={soundLink} options={options} />
                    {loading ? (
                        'loading'
                    ) : (
                        <>
                            <div className="game__box">
                                {guessedArrays.map((array, index) => (
                                    <GameBoxLineStatic
                                        key={index}
                                        guessedArray={array}
                                        length={array.length}
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
