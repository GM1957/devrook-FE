import React from "react";

import classes from "./EntryLoaderPostman.module.css";

const EntryLoaderPostman = (props) => (
  <div>
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
    <h1>L o a d i n g . . .</h1>
  </div>
);

export default EntryLoaderPostman;
