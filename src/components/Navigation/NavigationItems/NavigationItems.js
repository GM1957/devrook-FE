import React from 'react';
import classes from './NavigationItems.module.css';
import SignupButton from "../../Signup/SignupButton/SignupButton";
import LoginButton from "../../Login/LoginButton/LoginButton"

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
      <div className={classes.LoginButton}>
        <LoginButton />
      </div>
      <div className={classes.SignupButton}>
        <SignupButton />
      </div>
  </ul>
);

export default NavigationItems;