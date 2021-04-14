import React from "react";

import classes from "./EntryLoaderSmallBoxes.module.css";

const EntryLoaderSmallBoxes = (props) => {
  return (
    <div className={classes.MainWindow}>
      <div className={classes.container}>
        <div className={classes.loading}>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
      <h2 className={classes.DescriptionText}>Stay Calm & Drink ☕️</h2>
    </div>
  );
};

export default EntryLoaderSmallBoxes;
