import React, { useState, useEffect } from 'react';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import SelectedCard from './SelectedCard';
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

    return (
        <div className="game-page">
            <ComplexityPoints
                currentComplexity={complexity}
                onComplexityChange={handleComplexityChange}
                complexityArray={[0, 1, 2, 3, 4, 5]}
            />
            {selectedCard ? (
                <SelectedCard
                    image={selectedCard.image}
                    word={selectedCard.word}
                    translation={currentCardTranslation}
                />
            ) : (
                <SelectedCard image={startImage} />
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
                <Button className="speak" text="Start game" />
                <Button className="finish" text="Results" />
            </div>
        </div>
    );
};

export default GamePage;
