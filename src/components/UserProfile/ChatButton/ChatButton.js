import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./ChatButton.module.css";

const ChatButton = (props) => {
  return (
    <NavLink
      activeClassName={classes.active}
      to={`/me/messages/${props.userName}`}
      exact
    >
      <div className={classes.ChatButton}>
        <p>Chat</p>
      </div>
    </NavLink>
  );
};

export default ChatButton;
