import React from "react";
import SideRightBarItems from "../SideRightBarItems/SideRightBarItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

import classes from "./SideRightDrawer.module.css";

const SideRightDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} zIndex="100" clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <SideRightBarItems />
      </div>
    </Aux>
  );
};

export default SideRightDrawer;
