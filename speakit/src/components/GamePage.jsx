import React, { useState, useEffect, useRef, useCallback } from 'react';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import Image from './Image';
import Translation from './Translation';
import SpeechRecognitionText from './SpeechRecognitionText';
import Button from './Button';
import Loading from './Loading';
import startImage from '../img/start-image.jpg';
import api from '../api';
import createSpeechRecognition from '../createSpeechRecognition';
import ResultsPopUp from './ResultsPopUp';

const GamePage = () => {
    const speechRecognitionRef = useRef();
    const [complexity, setComplexity] = useState(0);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState();
    const [loading, setLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [speechText, setSpeechText] = useState();
    const [guessedWords, setGuessedWords] = useState([]);
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);

    const loadCards = useCallback((complexity) => {
        const page = Math.round(Math.random() * 29);
        setLoading(true);
        api.getCards(page, complexity).then((cards) => {
            setCards(cards.sort(() => Math.random() - 0.5));
            setSelectedCard(null);
            setLoading(false);
        });
    }, []);

    const handleComplexityChange = (newComplexity) => {
        setComplexity(newComplexity);
    };

    const handleCardSelected = (card) => {
        setSelectedCard(card);
    };

    const handleSpeechText = useCallback(
        (text) => {
            setSpeechText(text);
            const guessedCard = cards.find(({ word }) => word === text);
            if (guessedCard) {
                setGuessedWords((prevState) => {
                    if (prevState.includes(guessedCard.word)) {
                        return prevState;
                    }
                    setSelectedCard(guessedCard);
                    return [...prevState, guessedCard.word];
                });
            }
        },
        [cards]
    );

    const handleStartGame = () => {
        setGameStarted(true);
        setSelectedCard(null);
        const speechRecognition = speechRecognitionRef.current;
        if (speechRecognition) {
            speechRecognition.isStarted()
                ? speechRecognition.abort()
                : speechRecognition.start(handleSpeechText);
        }
    };

    const handleGamePause = useCallback(() => {
        setGameStarted(false);
        setSelectedCard(null);
        const speechRecognition = speechRecognitionRef.current;
        if (speechRecognition) {
            speechRecognition.isStarted()
                ? speechRecognition.abort()
                : speechRecognition.start(handleSpeechText);
        }
    }, [handleSpeechText]);

    const handlePopUpOpened = useCallback(() => {
        setIsPopUpOpened(true);
        handleGamePause();
    }, [handleGamePause]);

    const handleNewGame = () => {
        setGuessedWords([]);
        loadCards(complexity);
        handlePopUpClose();
    };

    const handlePopUpClose = () => {
        setIsPopUpOpened(false);
    };

    useEffect(() => {
        setGuessedWords([]);
        loadCards(complexity);
    }, [complexity, loadCards]);

    useEffect(() => {
        const cardsWords = cards.slice(0).map((card) => card.word);
        speechRecognitionRef.current = createSpeechRecognition(cardsWords);
        return () => {
            setSpeechText(undefined);
            setGameStarted(false);
            speechRecognitionRef.current && speechRecognitionRef.current.abort();
        };
    }, [cards]);

    useEffect(() => {
        if (guessedWords.length === 2) {
            handlePopUpOpened();
        }
    }, [guessedWords, handlePopUpOpened]);

    return (
        <div className="game-page">
            <ComplexityPoints
                currentComplexity={complexity}
                onComplexityChange={handleComplexityChange}
                complexityArray={[0, 1, 2, 3, 4, 5]}
            />
            {selectedCard ? (
                <Image image={selectedCard.image} word={selectedCard.word} />
            ) : (
                <Image image={startImage} />
            )}
            {gameStarted ? (
                <SpeechRecognitionText text={speechText} />
            ) : (
                <Translation translation={selectedCard ? selectedCard.translation : undefined} />
            )}

            {loading ? (
                <Loading />
            ) : (
                <CardsList
                    cards={cards}
                    selectedCard={selectedCard}
                    gameStarted={gameStarted}
                    guessedWords={guessedWords}
                    onCardSelected={handleCardSelected}
                />
            )}

            <div className="buttons">
                {gameStarted ? (
                    <Button className="stop" text="Pause game" onClick={handleGamePause} />
                ) : (
                    <Button className="speak" text="Speak it" onClick={handleStartGame} />
                )}

                <Button className="finish" text="Results" onClick={handlePopUpOpened} />
            </div>
            <ResultsPopUp
                open={isPopUpOpened}
                cards={cards}
                guessedCards={guessedWords}
                onClose={handlePopUpClose}
                onNewGame={handleNewGame}
            />
        </div>
    );
};

export default GamePage;
