import React from "react";

import classes from "./EntryLoaderPostman.module.css";

const EntryLoaderPostman = (props) => (
  <div className={classes.MainWindow}>
    <div className={classes.body}>
      <span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div className={classes.base}>
        <span></span>
        <div className={classes.face}></div>
      </div>
    </div>
    <div className={classes.longfazers}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <h1>Redirecting</h1>
  </div>
);

export default EntryLoaderPostman;
