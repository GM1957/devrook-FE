import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import SideRightBarItems from "./SideRightBarItems/SideRightBarItems";
import SideRightDrawer from "./SideRightDrawer/SideRightDrawer";

import classes from "./SideRightBar.module.css";

const SideRightBar = (props) => {
  const [openRightDrawer, setOpenSideDrawer] = useState(false);

  const openSideDrawerHandler = () => {
    setOpenSideDrawer(true);
  };

  const closeSideDrawerHandler = () => {
    setOpenSideDrawer(false);
  };

  return (
    <Aux>
      <div className={classes.SideRightBar}>
        <SideRightDrawer
          open={openRightDrawer}
          closed={closeSideDrawerHandler}
        />
        <div className={classes.SideRightBarItems}>
          <SideRightBarItems />
        </div>
        <div className={classes.RightSideDrawerButton}>
          <i
            onClick={openSideDrawerHandler}
            className="icon angle double left"
          ></i>
        </div>
      </div>
    </Aux>
  );
};

export default SideRightBar;
