import React from "react";
import Aux from "../Aux";
import SideLeftBar from "../../components/SideLeftBar/SideLeftBar";
import SideRightBar from "../../components/SideRightBar/SideRightBar";

import classes from "./HomeLayout.module.css";

const HomeLayout = (props) => {
  return (
    <Aux>
      <div className={classes.Content}>
        <div className={classes.Row}>
          <div className={classes.Column1}>
            <div className={classes.SideLeftBar}>
              <SideLeftBar />
            </div>
          </div>

          <div
            className={props.isRightBar ? classes.Column2 : classes.Column2V2}
          >
            <div className={classes.MiddleArea}>{props.children}</div>
          </div>

          <div
            className={props.isRightBar ? classes.Column3 : classes.Column3V2}
          >
            <div className={classes.SideRightBar}>
              <SideRightBar />
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default HomeLayout;
