import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import SideLeftBarItems from "../../SideLeftBar/SideLeftBarItems/SideLeftBarItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import RookLogo from "../../../assets/images/devrooklogo.png";
import Aux from "../../../hoc/Aux";

import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} zIndex="100" clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.HeaderSection}>
          <div className={classes.Logo}>
            <img src={RookLogo} alt="rookLogo" />
          </div>
          <div className={classes.NavItemsSection}>
            <NavigationItems
              loginModalOpen={props.loginModalOpen}
              signupModalOpen={props.signupModalOpen}
            />
          </div>
        </div>

        <div className={classes.LeftBarItems}>
          <SideLeftBarItems IsFull={true} />
        </div>
      </div>
    </Aux>
  );
};

export default SideDrawer;
