import React from "react";
import UpVoteButton from "../VoteButtons/UpVoteButton/UpVoteButton";
import DownVoteButton from "../VoteButtons/DownVoteButton/DownVoteButton";
import classes from "./QuestionCard.module.css";

const QuestionCard = (props) => (
  <div className={classes.QuestionsCard}>
    <div className={classes.VotesSection}>
        <UpVoteButton/>
      <div className={classes.VoteCount}>
          {props.Element.upVote - props.Element.downVote}
      </div>
      <DownVoteButton/>
    </div>
    <div className={classes.QuestionSection}>
      <div className={classes.QuestionTitle}>
          {props.Element.title}
      </div>
    </div>
  </div>
);

export default QuestionCard;
