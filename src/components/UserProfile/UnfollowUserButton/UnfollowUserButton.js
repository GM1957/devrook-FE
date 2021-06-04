import React from "react";
import { toast } from "react-toastify";
import { axios, apis } from "../../../services";
import classes from "./UnfollowUserButton.module.css";

const UnfollowUserButton = (props) => {
  const unfollowUserHandler = async () => {
    try {
      await axios.post(apis.FOLLOW_UNFOLLOW_USER, {
        userName: props.userName,
      });
    } catch (err) {
      toast.error("Internal server error");
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
