import React from "react";

import classes from "./UpVoteButton.module.css";

const UpVoteButton = (props) => (
  <div>
    <div className={classes.UpVoteButton}>
      <i className="icon caret up"/>
    </div>
  </div>
);

export default UpVoteButton;
