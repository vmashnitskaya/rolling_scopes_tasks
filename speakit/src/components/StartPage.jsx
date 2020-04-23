import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const StartPage = ({ onStart }) => (
  <div className="start-page">
    <Button className="start-page__button" text="Start" onClick={onStart} />
  </div>
);

StartPage.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartPage;
