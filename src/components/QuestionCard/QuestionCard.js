import React from "react";
import UpVoteButton from "../VoteButtons/UpVoteButton/UpVoteButton";
import DownVoteButton from "../VoteButtons/DownVoteButton/DownVoteButton";
import { NavLink } from "react-router-dom";
import { setMainFeed } from "../../redux/actions";
import { connect } from "react-redux";
import classes from "./QuestionCard.module.css";

const QuestionCard = (props) => (
  <div className={classes.QuestionsCard}>
    <div className={classes.VotesSection}>
      <UpVoteButton Element={props.Element} Type={props.Type} />
      <div className={classes.VoteCount}>
        {parseInt(props.Vote?.voteCount[props.Element.hashedUrl]?.upVotes) -
          parseInt(
            Math.abs(props.Vote?.voteCount[props.Element.hashedUrl]?.downVotes)
          )}
      </div>
      <DownVoteButton Element={props.Element} Type={props.Type} />
    </div>
    <div className={classes.QuestionAnswerSection}>
      <NavLink to={"/post/" + props.Element.hashedUrl} exact>
        <div className={classes.QuestionTitle}>
          <p>{props.Element.title}</p>
        </div>
      </NavLink>
    </div>
    <div className={classes.AnswerSection}>
      <NavLink to={"/post/" + props.Element.hashedUrl} exact>
        <p>
          [{props.Element?.responses}] <br /> Answers
        </p>
      </NavLink>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  setMainFeed,
})(QuestionCard);
