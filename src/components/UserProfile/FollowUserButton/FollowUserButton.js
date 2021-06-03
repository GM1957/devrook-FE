import React from "react";
import { axios, apis } from "../../../services";
import classes from "./FollowUserButton.module.css";

const FollowUserButton = (props) => {
  const followUserHandler = async () => {
    try {
      const res = await axios.post(apis.FOLLOW_UNFOLLOW_USER, {
        userName: props.userName,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
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
