import React from "react";
import classes from "./NavigationItems.module.css";
import SignupButton from "../../Signup/SignupButton/SignupButton";
import LoginButton from "../../Login/LoginButton/LoginButton";
import ProfileButton from "../ProfileButton/ProfileButton";
import { connect } from "react-redux";
import { login } from "../../../redux/actions";

const NavigationItems = (props) =>
  !props.Auth.isLoggedIn ? (
    <ul className={classes.NavigationItems}>
      <div className={classes.LoginButton}>
        <LoginButton open={props.loginModalOpen} />
      </div>
      <div className={classes.SignupButton}>
        <SignupButton open={props.signupModalOpen} />
      </div>
    </ul>
  ) : (
    <div className={classes.NavigationItems}>
      <div className={classes.ProfileButton}>
        <ProfileButton />
      </div>
    </div>
  );
const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  login,
})(NavigationItems);
