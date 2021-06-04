import React, { useState, useEffect } from "react";
import { axios, apis } from "../../../services";
import BlogCard from "../../BlogCard/BlogCard";
import QuestionCard from "../../QuestionCard/QuestionCard";
import {
  setMainFeed,
  isPersonalizedMainFeedFetched,
  voteHandler,
  voteCountHandler,
} from "../../../redux/actions";
import { connect } from "react-redux";
import HeartLoadaer from "../../EntryLoader/HeartLoader";

import classes from "./MainFeed.module.css";

const MainFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchMainFeed = async () => {
    setIsLoading(true);
    let result = {};
    let voteCountObj = {};

    try {
      // if user is logged in then fetch personalized posts basically here the posts will come according the tags which user follows
      if (props.Auth?.isLoggedIn) {
        // in vote obj i am already containing old votes data which user has done previously in the application
        const voteObj = { ...props.Vote.votes };

        result = await axios.post(
          apis.GET_PERSONALIZED_MAIN_FEED + "/false/false"
        );

        const voteIds = [];
        result?.data?.data?.Items.forEach((item) => {
          voteIds.push(item.hashedUrl);
          voteCountObj[item.hashedUrl] = {
            likes: item.like,
            upVotes: item.upVote,
            downVotes: item.downVote,
          };
        });

        const previousVoteDetails = await axios.post(
          apis.GET_USER_PREVIOUS_VOTES,
          { voteIds }
        );

        previousVoteDetails.data.data.forEach((item) => {
          voteObj[item.voteId] = {
            liked: item.voteType === "like" ? true : false,
            upVotted: item.voteType === "upVote" ? true : false,
            downVotted: item.voteType === "downVote" ? true : false,
          };
        });

        props.voteHandler(voteObj);

        props.isPersonalizedMainFeedFetched(true);
      } else {
        result = await axios.get(apis.GET_MAIN_FEED + "/false/false");
        result?.data?.data?.Items.forEach((item) => {
          voteCountObj[item.hashedUrl] = {
            likes: item.like,
            upVotes: item.upVote,
            downVotes: item.downVote,
          };
        });
      }
      if (result?.data?.data?.Items) {
        props.setMainFeed(result.data.data.Items);
        props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
      }
    } catch (err) {
      console.log("failed to set main feed", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!props.Feed?.mainFeed.length) {
      fetchMainFeed();
    }

    // i had to make universal flag to check if personalized posts fetched for not because for this if (!props.Feed?.mainFeed.length) important check check i was unable to update main feed because the initial value of props.Auth?.isLoggedIn is false and for that mainFeed was getting length and 2nd time when isLoggedIn is true for that check i was not able to fetch and update mainFeed with personalized main feed
    if (!props.Feed?.isPersonalizedMainFeedFetched) {
      if (props.Auth?.isLoggedIn) {
        fetchMainFeed();
      }
    }
  }, [props.Auth?.isLoggedIn]);

  return (
    <div>
      {isLoading ? (
        <HeartLoadaer />
      ) : (
        <div>
          <div className={classes.ReloadButton} onClick={() => fetchMainFeed()}>
            <i className="icon sync alternate"></i>
          </div>
          {props.Feed?.mainFeed?.map((ele, i) => {
            if (ele.postType === "blog") {
              return (
                <BlogCard Element={ele} Type="post" key={`blg-card-${i}`} />
              );
            } else if (ele.postType === "question") {
              return (
                <QuestionCard Element={ele} Type="post" key={`qs-card-${i}`} />
              );
            } else return null;
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Auth: state.Auth, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  setMainFeed,
  isPersonalizedMainFeedFetched,
  voteHandler,
  voteCountHandler,
})(MainFeed);
