import React from "react";
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import classNames from "classnames/bind";
import SearchBar from "../Search/Search"

const toolbar = (props) => (
  <div className={classes.Toolbar}>
    <div
      className={classNames(classes.HamBox, classes.MobileOnly)}
      onClick={props.sideDrawerOpen}
    >
      <div className={classes.Ham}></div>
      <div className={classes.Ham}></div>
      <div className={classes.Ham}></div>
    </div>

    <div className={classes.Logo}>
      <Logo />
    </div>

    <div>
      <SearchBar />
    </div>

    <nav className={classNames( classes.NavItems ,classes.DesktopOnly)}>
      <NavigationItems loginModalOpen = {props.loginModalOpen} signupModalOpen = {props.signupModalOpen}/>
    </nav>
  </div>
);

export default toolbar;
