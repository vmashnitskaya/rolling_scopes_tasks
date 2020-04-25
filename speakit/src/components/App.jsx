import React, { useState } from 'react';
import StartPage from './StartPage';
import GamePage from './GamePage';

const App = () => {
    const [started, setStarted] = useState(false);

    const handleStart = () => {
        setStarted(true);
    };

    return <main>{started ? <GamePage /> : <StartPage onStart={handleStart} />}</main>;
};

export default App;
