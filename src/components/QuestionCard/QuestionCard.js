import React from "react";
import UpVoteButton from "../VoteButtons/UpVoteButton/UpVoteButton";
import DownVoteButton from "../VoteButtons/DownVoteButton/DownVoteButton";
import { setMainFeed } from "../../redux/actions";
import { connect } from "react-redux";
import classes from "./QuestionCard.module.css";

const QuestionCard = (props) => (
  <div className={classes.QuestionsCard}>
    <div className={classes.VotesSection}>
      <UpVoteButton Element={props.Element} Type={props.Type} />
      <div className={classes.VoteCount}>
        {props.Vote?.voteCount[props.Element.hashedUrl]?.upVotes -
          props.Vote?.voteCount[props.Element.hashedUrl]?.downVotes}
      </div>
      <DownVoteButton Element={props.Element} Type={props.Type} />
    </div>
    <div className={classes.QuestionSection}>
      <div className={classes.QuestionTitle}>
        <p>{props.Element.title}</p>
      </div>
    </div>
    <div className={classes.AnswerSection}>
      <p>[{props.Element?.responses}] Answers</p>
    </div>
  </div>
);


const mapStateToProps = (state) => {
  return { Feed: state.Feed, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  setMainFeed,
})(QuestionCard);

