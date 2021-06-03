import React from "react";
import classNames from "classnames";
import classes from "./LoginButton.module.css";

const LoginButton = (props) => (
  <button
    className={classNames("ui button", classes.LoginButton)}
    onClick={props.open}
  >
    Login
  </button>
);

export default LoginButton;
