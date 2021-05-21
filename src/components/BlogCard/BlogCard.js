import React from "react";
import LikeButton from "../VoteButtons/LikeButton/LikeButton";
import classes from "./BlogCard.module.css";
import { setFeedBlogs } from "../../redux/actions";
import { connect } from "react-redux";

const BlogCard = (props) => {
  return (
    <div className={classes.BlogCard}>
      {props.Element?.coverImage && props.Element?.coverImage.length ? (
        <div className={classes.CoverImageSection}>
          <img src={props.Element?.coverImage} alt="coverImage" />
        </div>
      ) : (
        <div></div>
      )}

      <div className={classes.BlogContent}>
        <div className={classes.LikeSection}>
          <LikeButton
            Element={props.Element}
            Type={props.Type}
          />
          <div className={classes.LikeCount}>
            {props.Vote?.voteCount[props.Element.hashedUrl]?.likes}
          </div>
        </div>
        <div className={classes.BlogSection}>
          <div className={classes.BlogTitle}>
            <p>{props.Element?.title}</p>
          </div>
        </div>
      </div>
      <div className={classes.BlogResponseSection}>
        <p>[{props.Element?.responses}] Responses</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  setFeedBlogs,
})(BlogCard);
