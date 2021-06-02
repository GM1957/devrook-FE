import React from "react";
import { apis, axios } from "../../../services";
import {
  setFeedBlogs,
  voteHandler,
  voteCountHandler,
} from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./LikeButton.module.css";

const LikeButton = (props) => {
  const url = props.Element.hashedUrl
    ? props.Element.hashedUrl
    : props.Element.responseId;

  const likePostHandler = async () => {
    try {
      const res = await axios.post(apis.VOTE_POST, {
        voteType: "like",
        id: url,
        type: props.Type,
        // type is to define its post or response 
      });
      console.log("res", res);
    } catch (err) {
      console.log("unable to like", err);
    }
  };

  const increaseLikeHandler = () => {
    // in vote obj i am already containing old votes data which user has done previously in the application
    const voteObj = { ...props.Vote.votes };
    const voteCountObj = { ...props.Vote.voteCount };

    // checking the hased url is already present or not in votes object if present that means post is already liked
    // and if it is already liked then we have to remove the like in the nex click
    if (props.Vote?.votes[url]?.liked) {
      voteCountObj[url].likes -= 1;
      voteObj[url] = {...voteObj[url], liked: false };
    } else {
      voteCountObj[url].likes += 1;
      voteObj[url] = {...voteObj[url], liked: true };
    }

    props.voteHandler(voteObj);
    props.voteCountHandler(voteCountObj);
    likePostHandler();
  };

  return (
    <div>
      <div
        className={ props.Vote?.votes[url]?.liked
            ? classes.LikedButton
            : classes.LikeButton
        }
        onClick={() => increaseLikeHandler()}
      >
        <i className="icon heart"></i>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  setFeedBlogs,
  voteHandler,
  voteCountHandler,
})(LikeButton);
