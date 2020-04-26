import React, { useState, useEffect, useRef } from 'react';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import Image from './Image';
import Translation from './Translation';
import SpeechRecognitionText from './SpeechRecognitionText';
import Button from './Button';
import Loading from './Loading';
import startImage from '../img/start-image.jpg';
import api from '../api';
import createSpeechRecognition from '../createSpeechRecognition'

const GamePage = () => {
    const speechRecognitionRef = useRef();
    const [complexity, setComplexity] = useState(0);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState();
    const [currentCardTranslation, setCurrentCardTranslation] = useState();
    const [loading, setLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [speechText, setSpeechText] = useState();
    const [guessedWords, setGuessedWords] = useState([]);

    useEffect(() => {
        const page = Math.round(Math.random() * 29);
        setLoading(true);
        api.getCards(page, complexity).then((cards) => {
            setCards(cards.sort(() => Math.random() - 0.5).slice(0, 10));
            setSelectedCard(null);
            setLoading(false);
        });
    }, [complexity]);

    useEffect(() => {
        if (selectedCard) {
            api.getTranslation(selectedCard.word).then(setCurrentCardTranslation);
        } else {
            setCurrentCardTranslation(undefined);
        }
    }, [selectedCard]);

    useEffect(() => {
        const cardsWords = cards.slice(0).map(card => card.word);
        speechRecognitionRef.current = createSpeechRecognition(cardsWords);
        return () => {
            setSpeechText(undefined);
            setGameStarted(false);
            speechRecognitionRef.current && speechRecognitionRef.current.abort();
        }
    }, [cards]);

    const handleComplexityChange = (newComplexity) => {
        setComplexity(newComplexity);
    };

    const handleCardSelected = (card) => {
        setSelectedCard(card);
    };

    const handleSpeechText = (text) => {
        setSpeechText(text);
        const guessedWord = cards.map(card => card.word).find(word=> word === text);
        if (guessedWord) {
            setGuessedWords(prevState => {
                if(prevState.includes(guessedWord)) {
                    return prevState;
                }
                return [...prevState, guessedWord];
            })
        }
    }

    const handleNewGameStart = () => {
        setGameStarted(true);
        setSelectedCard(null);
        const speechRecognition = speechRecognitionRef.current;
        if (speechRecognition) {
            speechRecognition.isStarted() ? speechRecognition.abort() : speechRecognition.start(handleSpeechText);
            
        }
    };

    const handleGamePause = () =>{
        setGameStarted(false);
        setSelectedCard(null);
        const speechRecognition = speechRecognitionRef.current;
        if (speechRecognition) {
            speechRecognition.isStarted() ? speechRecognition.abort() : speechRecognition.start(handleSpeechText);
        }
    }

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
                <Translation translation={currentCardTranslation} />
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
                {gameStarted ? <Button className="stop" text="Pause game" onClick={handleGamePause} />: <Button className="speak" text="Start game" onClick={handleNewGameStart} />}
                
                <Button className="finish" text="Results" />
            </div>
        </div>
    );
};

export default GamePage;
