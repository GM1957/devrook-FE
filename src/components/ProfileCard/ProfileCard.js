import React from "react";
import RookLogo from "../../assets/images/devrooklogo.png";
import { NavLink } from "react-router-dom";
import classes from "./ProfileCard.module.css";

const ProfileCard = (props) => {
  return (
    <NavLink to={"/" + props?.Author?.userName} exact>
      <div className={classes.ProfileCard}>
        <div className={classes.HeaderColor}></div>
        <div className={classes.HeaderProfilePic}>
          <img
            src={
              props?.Author?.profilePicture?.length
                ? props.Author.profilePicture
                : RookLogo
            }
            alt="proPic"
          />
        </div>
        <div className={classes.DetailsSection}>
          <div className={classes.Reputation}>
            <i className="icon chess king"></i> <br />
            {props?.Author?.reputation}
          </div>
          <div className={classes.NameUserNameSection}>
            <p>{props?.Author?.name}</p>
            <strong>@{props?.Author?.userName}</strong>
          </div>

          <div className={classes.BioSection}>{props?.Author?.bio}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default ProfileCard;
