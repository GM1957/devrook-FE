import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./EditProfileButton.module.css";

const EditProfileButton = (props) => {
  return (
    <NavLink to="/profile/edit" exact>
      <div className={classes.EditProfile}>Edit Profile</div>
    </NavLink>
  );
};

export default EditProfileButton;
