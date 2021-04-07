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
    </div>
  );
};

export default EntryLoaderSmallBoxes;
