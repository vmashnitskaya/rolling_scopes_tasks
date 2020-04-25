import React, { useState, useEffect } from 'react';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import api from '../api';

const GamePage = () => {
    const [complexity, setComplexity] = useState(0);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const page = Math.round(Math.random() * 29);
        api.getCards(page, complexity).then((cards) => {
            setCards(cards.sort(() => Math.random() - 0.5).slice(0, 10));
        });
    }, [complexity]);

    const handleComplexityChange = (newComplexity) => {
        setComplexity(newComplexity);
    };

    return (
        <div className="game-page">
            <ComplexityPoints
                currentComplexity={complexity}
                onComplexityChange={handleComplexityChange}
                complexityArray={[0, 1, 2, 3, 4, 5]}
            />
            <CardsList tempCards={cards} />
        </div>
    );
};

export default GamePage;
