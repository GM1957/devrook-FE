import React, { useState } from "react";
import { Dropdown, Icon, Card } from "semantic-ui-react";
import classes from "./ProfileButton.module.css";
import { logout } from "../../../redux/actions";
import { connect } from "react-redux";

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
              <button className={classes.Buttons}>
                <h4>My Full Name @username</h4>
              </button>
            </ul>
            <ul className={classes.ul2}>
              <button className={classes.Buttons} onClick={logoutHandler}>
                {isLogouting ? <h4>Signing Out...</h4> : <h4>Sign Out</h4>}
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
