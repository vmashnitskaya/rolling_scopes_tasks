import React, { useState, useEffect } from 'react';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import Image from './Image';
import Translation from './Translation';
import SpeechRecognitionText from './SpeechRecognitionText';
import Button from './Button';
import Loading from './Loading';
import startImage from '../img/start-image.jpg';
import api from '../api';

const GamePage = () => {
    const [complexity, setComplexity] = useState(0);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState();
    const [currentCardTranslation, setCurrentCardTranslation] = useState();
    const [loading, setLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [speechText, setSpeechText] = useState();

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

    const handleComplexityChange = (newComplexity) => {
        setComplexity(newComplexity);
    };

    const handleCardSelected = (card) => {
        setSelectedCard(card);
    };

    const handleGameStart = () => {
        setGameStarted(true);
        setSelectedCard(null);
        api.recognizeSpeech(setSpeechText);
    };

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
                    onCardSelected={handleCardSelected}
                />
            )}

            <div className="buttons">
                <Button className="restart" text="Restart" />
                <Button className="speak" text="Start game" onClick={handleGameStart} />
                <Button className="finish" text="Results" />
            </div>
        </div>
    );
};

export default GamePage;
