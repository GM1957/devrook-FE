import React, { useState } from "react";
import { Dropdown, Icon, Card } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./ProfileButton.module.css";

const ProfileButton = (props) => {
  const [isLogouting, setLogouting] = useState(false);

  const logoutHandler = () => {
    setLogouting(true);
    props.logout();
  };

  const trigger = (
    <span>
      <Icon size="big" name="user circle" />
    </span>
  );
  return (
    <Dropdown trigger={trigger}>
      <Dropdown.Menu className="pointing left">
        <div className={classes.Card}>
          <Card fluid>
            <ul className={classes.ul1}>
              <NavLink
                to={"/" + props?.Auth?.cognitoUserInfo?.attributes?.profile}
                exact
              >
                <button className={classes.Buttons}>
                  <p>@{props?.Auth?.cognitoUserInfo?.attributes?.profile}</p>
                </button>
              </NavLink>
            </ul>
            <ul className={classes.ul1}>
              <NavLink to="/my/dashboard" exact>
                <button className={classes.Buttons}>
                  <p>Dashboard</p>
                </button>
              </NavLink>
            </ul>
            <ul className={classes.ul2}>
              <button className={classes.Buttons} onClick={logoutHandler}>
                {isLogouting ? <p>Signing Out...</p> : <p>Sign Out</p>}
              </button>
            </ul>
          </Card>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  logout,
})(ProfileButton);
