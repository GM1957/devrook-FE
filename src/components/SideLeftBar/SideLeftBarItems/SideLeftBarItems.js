import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import { login } from "../../../redux/actions";
import { connect } from "react-redux";

import classes from "./SideLeftBarItems.module.css";

const SideLeftBarItems = (props) => {
  const history = useHistory();

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

          {/* activeClassName is an predefined name which used to activate a class based on current path */}

          {props.Auth?.isLoggedIn ? (
            <div>
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

              <NavLink
                activeClassName={classes.active}
                to={"/" + props.Auth?.cognitoUserInfo?.attributes?.profile}
                exact
              >
                <button className={classes.Buttons}>
                  <Icon name="user" /> <span> Profile </span>
                </button>
              </NavLink>
            </div>
          ) : (
            <div>
              <button
                className={classes.Buttons}
                onClick={() => history.push("/user/login")}
              >
                <Icon name="tags" /> <span> Tags </span>
              </button>
              <button
                className={classes.Buttons}
                onClick={() => history.push("/user/login")}
              >
                <Icon name="mail" /> <span> Messages </span>
              </button>
              <button
                className={classes.Buttons}
                onClick={() => history.push("/user/login")}
              >
                <Icon name="user" /> <span> Profile </span>
              </button>
            </div>
          )}
        </div>

        <div className={classes.CreateButtonSection}>
          <div className={classes.CreateTooltip}>
            <button className={classes.CreateButton}>Create</button>
            <span className={classes.CreateTooltipCard}>
              {props.Auth.isLoggedIn ? (
                <div>
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
                </div>
              ) : (
                <div>
                  {" "}
                  <div
                    className={classes.CreateQuestionButton}
                    onClick={() => history.push("/user/login")}
                  >
                    Question
                  </div>
                  <div
                    className={classes.CreateBlogButton}
                    onClick={() => history.push("/user/login")}
                  >
                    Blog
                  </div>
                </div>
              )}
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
