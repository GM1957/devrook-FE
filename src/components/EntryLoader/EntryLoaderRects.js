import React from "react";

import classes from "./EntryLoaderRects.module.css";

const EntryLoaderRects = (props) => (
  <div className={classes.MainWindow}>
    <div className={classes.loader}>
      <div className={classes.bar1}></div>
      <div className={classes.bar2}></div>
      <div className={classes.bar3}></div>
      <div className={classes.bar4}></div>
      <div className={classes.bar5}></div>
      <div className={classes.bar6}></div>
    </div>
  </div>
);

export default EntryLoaderRects;
