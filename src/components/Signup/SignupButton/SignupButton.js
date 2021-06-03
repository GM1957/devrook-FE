import React from "react";
import classNames from "classnames";
import classes from "./SignupButton.module.css";

const SignupButton = (props) => (
  <button
    onClick={props.open}
    className={classNames("ui primary button", classes.SignupButton)}
  >
    Create account
  </button>
);

export default SignupButton;
