import React, { useState, useEffect } from "react";
import { axios, apis } from "../../../services";
import BlogCard from "../../BlogCard/BlogCard";
import QuestionCard from "../../QuestionCard/QuestionCard";
import {
  setDevFeed,
  isPersonalizedDevFeedFetched,
  voteHandler,
  voteCountHandler,
} from "../../../redux/actions";
import { connect } from "react-redux";
import HeartLoadaer from "../../EntryLoader/HeartLoader";

import classes from "./DevFeed.module.css";

const DevFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchDevFeed = async () => {
    setIsLoading(true);
    let result = {};
    const resultItems = [];
    let voteCountObj = {};

    try {
      // if user is logged in then fetch personalized Dev feed basically here the Dev feed will come according the tags which user follows
      if (props.Auth?.isLoggedIn) {
        // in vote obj i am already containing old votes data which user has done previously in the application
        const voteObj = { ...props.Vote.votes };

        result = await axios.post(apis.GET_PERSONALIZED_DEV_FEED, {
          limit: "false",
          LastEvaluatedKey: "false",
        });

        // Refactoring the result here

        result?.data?.data?.Items.forEach((item) => resultItems.push(...item));

        const voteIds = [];
        resultItems.forEach((item) => {
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
          voteObj[item[0]?.voteId] = item[0]?.voteType;
        });

        props.voteHandler(voteObj);

        props.isPersonalizedDevFeedFetched(true);
      } else {
        result = await axios.get(apis.GET_PUBLIC_DEV_FEED + "/false/false");
        result?.data?.data?.Items.forEach((item) => {
          voteCountObj[item.hashedUrl] = {
            likes: item.like,
            upVotes: item.upVote,
            downVotes: item.downVote,
          };
        });
      }
      if (resultItems.length) {
        props.setDevFeed(resultItems);
        props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
      }
    } catch (err) {
      console.log("failed to set devs feed", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!props.Feed?.mainFeed.length) {
      fetchDevFeed();
    }

    // i had to make universal flag to check if personalized posts fetched for not because for this if (!props.Feed?.mainFeed.length) important check check i was unable to update main feed because the initial value of props.Auth?.isLoggedIn is false and for that mainFeed was getting length and 2nd time when isLoggedIn is true for that check i was not able to fetch and update mainFeed with personalized main feed
    if (!props.Feed?.isPersonalizedDevFeedFetched) {
      if (props.Auth?.isLoggedIn) {
        fetchDevFeed();
      }
    }
  }, [props.Auth?.isLoggedIn]);

  return (
    <div>
      {isLoading ? (
        <HeartLoadaer />
      ) : (
        <div>
          <div className={classes.ReloadButton} onClick={() => fetchDevFeed()}>
            <i className="icon sync alternate"></i>
          </div>
          {props.Feed?.mainFeed?.map((ele, i) => {
            if (ele.postType === "blog") {
              return <BlogCard Index={i} Element={ele} key={`blg-card-${i}`} />;
            } else if (ele.postType === "question") {
              return (
                <QuestionCard Index={i} Element={ele} key={`qs-card-${i}`} />
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
  setDevFeed,
  isPersonalizedDevFeedFetched,
  voteHandler,
  voteCountHandler,
})(DevFeed);
