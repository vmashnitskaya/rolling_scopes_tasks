import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';
import SignupPage from './SignupPage';
import SigninPage from './SigninPage';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') === 'true' : false
    );
    const onLogInOut = () => {
        setLoggedIn(!loggedIn);
    };
    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn);
    }, [loggedIn]);

    return (
        <BrowserRouter>
            <Switch>
                {loggedIn ? (
                    <>
                        <Route exact path="/">
                            <StartPage />
                        </Route>
                        <Route path="/game">
                            <GamePage onLogOut={onLogInOut} />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <SigninPage onLogIn={onLogInOut} />
                        </Route>
                        <Route exact path="/sign-up">
                            <SignupPage />
                        </Route>
                    </>
                )}

                <Route>Page not found</Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
