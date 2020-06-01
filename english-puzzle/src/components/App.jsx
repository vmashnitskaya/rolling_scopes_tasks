import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <StartPage />
                </Route>
                <Route path="/game">
                    <GamePage />
                </Route>
                <Route>Page not found</Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
