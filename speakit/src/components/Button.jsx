import React from 'react';
import PropTypes from 'prop-types';
import clcx from 'clsx';

const Button = ({ className, text, onClick }) => (
  <button className={clcx('button', className)} type="button" onClick={onClick}>{text}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: undefined,
};

export default Button;
