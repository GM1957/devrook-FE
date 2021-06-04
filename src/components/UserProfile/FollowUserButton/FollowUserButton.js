import React from "react";
import { axios, apis } from "../../../services";
import classes from "./FollowUserButton.module.css";

const FollowUserButton = (props) => {
  const followUserHandler = async () => {
    try {
      await axios.post(apis.FOLLOW_UNFOLLOW_USER, {
        userName: props.userName,
      });
    } catch (err) {
      console.log("failed to follow the user", err);
    }
  };

  return (
    <div
      onClick={() => {
        props.changer("follow");
        followUserHandler();
      }}
      className={classes.FollowUserButton}
    >
      <p>Follow</p>
    </div>
  );
};

export default FollowUserButton;
