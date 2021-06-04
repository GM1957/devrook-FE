import React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { apis, axios } from "../../../services";
import {
  setFeedBlogs,
  voteHandler,
  voteCountHandler,
} from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./DownVoteButton.module.css";

const DownVoteButton = (props) => {
  const history = useHistory();

  const url = props.Element.hashedUrl
    ? props.Element.hashedUrl
    : props.Element.responseId;

  const downVotePostHandler = async () => {
    try {
      await axios.post(apis.VOTE_POST, {
        voteType: "downVote",
        id: url,
        type: props.Type,
        // type is to define its post or response
      });
    } catch (err) {
      toast.error("Internal server error");
      console.log(err);
    }
  };

  const increaseDownVoteHandler = () => {
    if (!props?.Auth?.isLoggedIn) return history.push("/user/login");

    // in vote obj i am already containing old votes data which user has done previously in the application
    const voteObj = { ...props.Vote.votes };
    const voteCountObj = { ...props.Vote.voteCount };

    // checking the hased url is already present or not in votes object if present that means post is already upvotted
    // and if it is already upvotted then we have to remove the upvote in the nex click
    if (props.Vote?.votes[url]?.downVotted) {
      voteCountObj[url].downVotes -= 1;
      voteObj[url] = { ...voteObj[url], downVotted: false };
    } else {
      voteCountObj[url].downVotes += 1;
      voteObj[url] = { ...voteObj[url], downVotted: true };
      voteObj[url] = { ...voteObj[url], upVotted: false };
    }

    props.voteHandler(voteObj);
    props.voteCountHandler(voteCountObj);
    downVotePostHandler();
  };

  return (
    <div>
      <div
        className={
          props.Vote?.votes[url]?.downVotted
            ? classes.DownVottedButton
            : classes.DownVoteButton
        }
        onClick={() => increaseDownVoteHandler()}
      >
        <i className={["icon caret down", classes.icon].join(" ")} />
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
})(DownVoteButton);
