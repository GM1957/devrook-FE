import React from "react";
import { axios, apis } from "../../../services";
import classes from "./UnfollowUserButton.module.css";

const UnfollowUserButton = (props) => {
  const unfollowUserHandler = async () => {
    try {
      await axios.post(apis.FOLLOW_UNFOLLOW_USER, {
        userName: props.userName,
      });
    } catch (err) {
      console.log("failed to unfollow the user", err);
    }
  };
  return (
    <div
      onClick={() => {
        props.changer("unfollow");
        unfollowUserHandler();
      }}
      className={classes.UnfollowUserButton}
    >
      <p>Unfollow</p>
    </div>
  );
};

export default UnfollowUserButton;
