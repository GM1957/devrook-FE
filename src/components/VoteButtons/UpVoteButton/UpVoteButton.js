import React from "react";
import { useHistory } from "react-router-dom";
import { apis, axios } from "../../../services";
import {
  setFeedBlogs,
  voteHandler,
  voteCountHandler,
} from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./UpVoteButton.module.css";

const UpVoteButton = (props) => {
  const history = useHistory();

  const url = props.Element.hashedUrl
    ? props.Element.hashedUrl
    : props.Element.responseId;

  const upVotePostHandler = async () => {
    try {
      await axios.post(apis.VOTE_POST, {
        voteType: "upVote",
        id: url,
        type: props.Type,
        // type is to define its post or response
      });
    } catch (err) {
      console.log("failed to upvote", err);
    }
  };

  const increaseUpVoteHandler = () => {
    if (!props?.Auth?.isLoggedIn) return history.push("/user/login");

    // in vote obj i am already containing old votes data which user has done previously in the application
    const voteObj = { ...props.Vote.votes };
    const voteCountObj = { ...props.Vote.voteCount };

    // checking the hased url is already present or not in votes object if present that means post is already upvotted
    // and if it is already upvotted then we have to remove the upvote in the nex click
    if (props.Vote.votes[url]?.upVotted) {
      voteCountObj[url].upVotes -= 1;
      voteObj[url] = { ...voteObj[url], upVotted: false };
    } else {
      voteCountObj[url].upVotes += 1;
      voteObj[url] = { ...voteObj[url], upVotted: true };
      voteObj[url] = { ...voteObj[url], downVotted: false };
    }

    props.voteHandler(voteObj);
    props.voteCountHandler(voteCountObj);
    upVotePostHandler();
  };

  return (
    <div>
      <div
        className={
          props.Vote?.votes[url]?.upVotted
            ? classes.UpVottedButton
            : classes.UpVoteButton
        }
        onClick={() => increaseUpVoteHandler()}
      >
        <i className="icon caret up" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Vote: state.Vote, Auth: state.Auth };
};

export default connect(mapStateToProps, {
  setFeedBlogs,
  voteHandler,
  voteCountHandler,
})(UpVoteButton);
