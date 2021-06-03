import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { login } from "../../../redux/actions";
import { connect } from "react-redux";

import classes from "./SideLeftBarItems.module.css";

const SideLeftBarItems = (props) => {
  return (
    <div className={classes.SideLeftBarItems}>
      <div className={props.IsFull ? "" : classes.Main}>
        <div className={classes.ButtonsColumn}>
          <NavLink activeClassName={classes.active} to="/" exact>
            <button className={classes.Buttons}>
              <Icon name="home" /> <span> Home </span>
            </button>
          </NavLink>

          <NavLink
            activeClassName={classes.active}
            to="/explore/globalfeed"
            exact
          >
            <button className={classes.Buttons}>
              <Icon name="hashtag" /> <span> Explore </span>
            </button>
          </NavLink>

          <NavLink activeClassName={classes.active} to="/tags/all" exact>
            <button className={classes.Buttons}>
              <Icon name="tags" /> <span> Tags </span>
            </button>
          </NavLink>

          <NavLink activeClassName={classes.active} to="/me/messages" exact>
            <button className={classes.Buttons}>
              <Icon name="mail" /> <span> Messages </span>
            </button>
          </NavLink>

          {/* activeClassName is an predefined name which used to activate a class based on current path */}
          <NavLink
            activeClassName={classes.active}
            to={
              "/" +
              (props.Auth.isLoggedIn
                ? props.Auth?.cognitoUserInfo?.attributes?.profile
                : "user/login")
            }
            exact
          >
            <button className={classes.Buttons}>
              <Icon name="user" /> <span> Profile </span>
            </button>
          </NavLink>
        </div>

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
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  login,
})(SideLeftBarItems);
