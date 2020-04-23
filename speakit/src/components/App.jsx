import React, { useState } from 'react';
import StartPage from './StartPage';

const App = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <main>
      {started ? <div>Game is started!</div> : <StartPage onStart={handleStart} />}
    </main>
  );
};

export default App;
