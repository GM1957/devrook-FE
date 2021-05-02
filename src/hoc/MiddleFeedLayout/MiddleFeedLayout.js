import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MiddleFeedLayout.module.css";

const MiddleFeedLayout = (props) => {
  return (
    <div>
      <header className={classes.MiddleFeedHeader}>
        <NavLink activeClassName={classes.active} to="/" exact>
          <button className={classes.MiddleFeedHeaderButton}>Questions</button>
        </NavLink>
        <NavLink activeClassName={classes.active} to="/feed/blogs" exact>
          <button className={classes.MiddleFeedHeaderButton}>Blogs</button>
        </NavLink>
        <button className={classes.MiddleFeedHeaderButton}>Feed</button>
        <button className={classes.MiddleFeedHeaderButton}>DevFeed</button>
      </header>
      <div className={classes.MiddleFeedContent}>{props.children}</div>
    </div>
  );
};

export default MiddleFeedLayout;
