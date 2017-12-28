import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Button = ({ children, disabled, onClick }) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {}
};

export default Button;
