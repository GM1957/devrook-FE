import React from "react";
import { NavLink } from "react-router-dom";
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
          <LikeButton Element={props.Element} Type={props.Type} />
          <div className={classes.LikeCount}>
            {props.Vote?.voteCount[props.Element.hashedUrl]?.likes}
          </div>
        </div>
        <div className={classes.BlogSection}>
          <NavLink to={"/post/" + props.Element.hashedUrl} exact>
            <div className={classes.BlogTitle}>
              <p>{props.Element.title}</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={classes.BlogResponseSection}>
        <NavLink to={"/post/" + props.Element.hashedUrl} exact>
          <p>[{props.Element?.responses}] Responses</p>
        </NavLink>
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
