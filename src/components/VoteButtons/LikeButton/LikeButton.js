import React, { useState } from "react";
import { apis, axios } from "../../../services";
import { setFeedBlogs, voteHandler } from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./LikeButton.module.css";

const LikeButton = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const likePostHandler = async () => {
    try {
      const response = await axios.post(apis.VOTE_POST, {
        voteType: "like",
        postUrl: props.Element.hashedUrl,
      });
      console.log("likePostHandler", response);
    } catch (err) {
      console.log("unable to like", err);
    }
  };

  const increaseLikeHandler = () => {
    // this oldBlogFeedArr will be used to update like count of the feeds element which is stored in redux (i am doing it to reduce api call and to give fast userExperience)
    // with the vote handler i am maintaining the like events to show user already liked the post or not in all over the application
    let oldBlogFeedArr = [...props.Feed?.blogsFeed];
    let oldElement = { ...props.Element };
    // in vote obj i am already containing old votes data which user has done previously in the application
    const voteObj = { ...props.Vote.votes };

    // checking the hased url is already present or not in votes object if present that means post is already liked
    // and if it is already liked then we have to remove the like in the nex click
    if (props.Vote.votes[props.Element.hashedUrl]) {
      oldElement.like = oldElement.like - 1;
      delete voteObj[props.Element.hashedUrl];
      setIsLiked(false);
    } else {
      oldElement.like = oldElement.like + 1;
      voteObj[props.Element.hashedUrl] = "liked";
      setIsLiked(true);
    }

    oldBlogFeedArr[props.Index] = oldElement;
    props.setFeedBlogs(oldBlogFeedArr);
    props.voteHandler(voteObj);
    likePostHandler();
  };

  return (
    <div>
      <div
        className={
          isLiked || props.Vote.votes[props.Element.hashedUrl]
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
})(LikeButton);
