import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import classes from "./SideLeftBarItems.module.css";

const SideLeftBarItems = (props) => {
  return (
    <div className={classes.SideLeftBarItems}>

      <NavLink activeClassName={classes.active} to="/" exact>
        <button className={classes.Buttons}>
          <Icon name="home" /> <span> Home </span>
        </button>
      </NavLink>

      <button className={classes.Buttons}>
        <Icon name="hashtag" /> <span> Explore </span>
      </button>
      <button className={classes.Buttons}>
        <Icon name="tags" /> <span> Tags </span>
      </button>
      <button className={classes.Buttons}>
        <Icon name="alarm" /> <span> Notifications </span>
      </button>
      <button className={classes.Buttons}>
        <Icon name="mail" /> <span> Messages </span>
      </button>

      <NavLink activeClassName={classes.active} to="/username" exact>
        <button className={classes.Buttons}>
          <Icon name="user" /> <span> Profile </span>
        </button>
      </NavLink>

      <button className={classes.CreateButton}>Create</button>
    </div>
  );
};

export default SideLeftBarItems;
