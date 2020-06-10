import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import authorization from '../authorization';
import Message from './Message';

const SignupPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
        document.querySelector('form').reset();
    }, [infoMessage]);

    const onSignUp = async (email, password) => {
        const user = {
            email: `${email}`,
            password: `${password}`,
        };
        try {
            const loginInfo = await authorization.createUser(user);
            if (typeof loginInfo === 'object') {
                setInfoMessage(
                    `User with e-mail ${loginInfo.email} was succesfully created. Please sign in.`
                );
            } else {
                setErrorMessage('Incorrect e-mail or password');
            }
        } catch (e) {
            setErrorMessage('Something went wrong, please try again later.');
        }
    };
    const onFormError = (text) => {
        setErrorMessage(text);
    };
    return (
        <div className="signup-page">
            <h1>EnglishPuzzle</h1>
            <div className="link-to-sign-up">
                <div>Have an acount?</div>
                <Link to="/" className="sign-in">
                    Sign in
                </Link>
            </div>
            <Form
                className="login-form"
                emailClassName="login"
                passwordClassName="password-for-sign-in"
                submitClassName="submit"
                submitText="Sign up"
                onSubmit={onSignUp}
                onError={onFormError}
            />
            {infoMessage && <Message className="info" text={infoMessage} />}
            {errorMessage && <Message className="error" text={errorMessage} />}
        </div>
    );
};

SignupPage.propTypes = {};

export default SignupPage;
