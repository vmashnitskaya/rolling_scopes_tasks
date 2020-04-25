import React, { useState, useEffect } from 'react';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import SelectedCard from './SelectedCard';
import startImage from '../img/start-image.jpg';
import api from '../api';

const GamePage = () => {
    const [complexity, setComplexity] = useState(0);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState();

    useEffect(() => {
        const page = Math.round(Math.random() * 29);
        api.getCards(page, complexity).then((cards) => {
            setCards(cards.sort(() => Math.random() - 0.5).slice(0, 10));
            setSelectedCard(null);
        });
    }, [complexity]);

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
                <SelectedCard image={selectedCard.image} word={selectedCard.word} />
            ) : (
                <SelectedCard image={startImage} word={'\u00a0'} />
            )}
            <CardsList
                cards={cards}
                selectedCard={selectedCard}
                onCardSelected={handleCardSelected}
            />
        </div>
    );
};

export default GamePage;
