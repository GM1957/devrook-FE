import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import RookLogo from "../../../assets/images/devrooklogo.png";
import classNames from "classnames/bind";
import SearchBar from "../Search/Search";

const toolbar = (props) => (
  <div className={classes.Toolbar}>
    <div className={classes.LogoHamArea}>
      <div
        className={classNames(classes.HamBox, classes.MobileOnly)}
        onClick={props.sideDrawerOpen}
      >
        <div className={classes.Ham}></div>
        <div className={classes.Ham}></div>
        <div className={classes.Ham}></div>
      </div>

      <div className={classNames(classes.Logo, classes.DesktopOnly)}>
        <img src={RookLogo} alt="rookLogo" />
      </div>
    </div>

    <div className={classes.SearchBoxArea}>
      <SearchBar />
    </div>

    <div className={classes.LogoNavItemArea}>
      <div className={classes.DesktopOnly}>
        <NavigationItems
          loginModalOpen={props.loginModalOpen}
          signupModalOpen={props.signupModalOpen}
        />
      </div>
      <div className={classNames(classes.Logo, classes.MobileOnly)}>
        <img src={RookLogo} alt="rookLogo" />
      </div>
    </div>
  </div>
);

export default toolbar;
