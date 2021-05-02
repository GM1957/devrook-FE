import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { login } from "../../../redux/actions";
import { connect } from "react-redux";

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

      {/* activeClassName is an predefined name which used to activate a class based on current path */}
      <NavLink
        activeClassName={classes.active}
        to={
          "/" +
          (props.Auth.isLoggedIn
            ? props.Auth?.cognitoUserInfo?.attributes?.profile
            : "/")
        }
        exact
      >
        <button className={classes.Buttons}>
          <Icon name="user" /> <span> Profile </span>
        </button>
      </NavLink>
      
      <div className={classes.CreateButtonSection}>
        <div className={classes.CreateTooltip}>
          <button className={classes.CreateButton}>Create</button>
          <span className={classes.CreateTooltipCard}>
            <NavLink
              activeClassName={classes.ActiveTooltipButton}
              to="/new/question"
              exact
            >
              <div className={classes.CreateQuestionButton}>Question</div>
            </NavLink>
            <NavLink
              activeClassName={classes.ActiveTooltipButton}
              to="/new/blog"
              exact
            >
              <div className={classes.CreateBlogButton}>Blog</div>
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  login,
})(SideLeftBarItems);
