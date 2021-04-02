import React from 'react';
import classNames from 'classnames';
import classes from './LoginButton.module.css';

const LoginButton = (props) => (
    <button className={classNames("ui button", classes.LoginButton)}>Login</button>
);

export default LoginButton;