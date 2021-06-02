import React from "react";
import { axios, apis } from "../../../services";
import classes from "./UnfollowUserButton.module.css";

const UnfollowUserButton = (props) => {
  const unfollowUserHandler = async () => {
    try {
      const res = await axios.post(apis.FOLLOW_UNFOLLOW_USER, { userName: props.userName });
      console.log(res)
    } catch (err) {
      console.log(err);
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
