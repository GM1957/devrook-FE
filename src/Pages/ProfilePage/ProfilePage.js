import React from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import Rook from "../../assets/images/devrooklogo.png";

import classes from "./ProfilePage.module.css";

const ProfilePage = (props) => {
  return (
    <HomeLayout>
      <div className={classes.ProfileCard}>
        <div className={classes.HeaderAnimation}>
          <div className={classes.Stars}></div>
          <div className={classes.Stars2}></div>
          <div className={classes.Stars3}></div>
        </div>
        <img src={Rook} alt="UserImage" className={classes.UserPic} />
      </div>
    </HomeLayout>
  );
};

export default ProfilePage;
