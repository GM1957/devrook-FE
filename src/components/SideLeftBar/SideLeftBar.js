import React from "react";
import Aux from "../../hoc/Aux";
import SideLeftBarItems from "./SideLeftBarItems/SideLeftBarItems";

import classes from "./SideLeftBar.module.css";

const SideLeftBar = (props) => {
  return (
    <Aux>
      <div className={classes.SideLeftBar}>
        <SideLeftBarItems />
      </div>
    </Aux>
  );
};

export default SideLeftBar;
