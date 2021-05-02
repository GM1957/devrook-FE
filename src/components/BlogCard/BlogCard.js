import React from "react";
import LikeButton from "../VoteButtons/LikeButton/LikeButton";
import classes from "./BlogCard.module.css";

const BlogCard = (props) => {
  return (
    <div className={classes.BlogCard}>
      <div className={classes.VotesSection}>
        <LikeButton />
      </div>
      <div className={classes.QuestionSection}>
        <div className={classes.QuestionTitle}>{props.Element.title}</div>
      </div>
    </div>
  );
};

export default BlogCard;
