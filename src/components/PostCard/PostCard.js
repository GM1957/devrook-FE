import React, { useState, useEffect } from "react";
import { voteHandler, voteCountHandler } from "../../redux/actions";
import UpVoteButton from "../../components/VoteButtons/UpVoteButton/UpVoteButton";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import DownVoteButton from "../../components/VoteButtons/DownVoteButton/DownVoteButton";
import LikeButton from "../../components/VoteButtons/LikeButton/LikeButton";

import { randomColor } from "../../services";
import { edjsHTMLParser } from "../../services";
import { Markup } from "interweave";
import classes from "./PostCard.module.css";

const PostCard = (props) => {
  // **** WE ARE DEALING WITH THE PREVIOUS VOTING DETAILS IN THE RESPONSES COMPONENT **** //
  let voteCountObj = {};

  const [postInHtmlArr, setPostInHtmlArr] = useState([]);

  useEffect(() => {
    if (props.Post?.content) {
      setPostInHtmlArr(edjsHTMLParser.parse(props.Post?.content));

      voteCountObj[props.Post.hashedUrl] = {
        upVotes: props.Post.upVote,
        downVotes: props.Post.downVote,
        likes: props.Post.like ? props.Post.like : 0,
      };

      props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
    }
  }, [props.Post?.content]);

  return (
    <div className={classes.PostCard}>
      {props.Post?.coverImage?.length ? (
        <div className={classes.CoverImage}>
          <img src={props.Post?.coverImage} alt="headerImage" />
        </div>
      ) : null}

      <div className={classes.TitleTagVoteSection}>
        <div className={classes.TitleTagSection}>
          <div className={classes.PostTitle}>
            <p>{props.Post?.title}</p>
          </div>
          <div className={classes.TagsSection}>
            {props.Post?.tags?.map((tag, i) => {
              const bgColor = randomColor();
              return (
                <div
                  className={classes.TagBox}
                  style={{ backgroundColor: bgColor ? bgColor : "purple" }}
                  key={`card-ele-${i}`}
                >
                  <NavLink to={"/tag/" + tag} exact>
                    <p>#{tag}</p>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.VoteSection}>
          {props.Post?.postType === "blog" ? (
            <div className={classes.LikeButtonSection}>
              <LikeButton Element={props.Post} Type="post" />
              <p>{props.Vote?.voteCount[props.Post.hashedUrl]?.likes}</p>
            </div>
          ) : (
            <div className={classes.VotingSection}>
              <UpVoteButton Element={props.Post} Type="post" />
              <div className={classes.VoteCount}>
                <p>
                  {props.Vote?.voteCount[props.Post.hashedUrl]?.upVotes -
                    Math.abs(
                      props.Vote?.voteCount[props.Post.hashedUrl]?.downVotes
                    )}
                </p>
              </div>
              <DownVoteButton Element={props.Post} Type="post" />
            </div>
          )}
        </div>
      </div>
      <div className={classes.ContentArea}>
        {postInHtmlArr?.map((item) => (
          <Markup content={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Auth: state.Auth, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  voteHandler,
  voteCountHandler,
})(PostCard);
