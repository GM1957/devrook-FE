import React, { useState, useEffect } from "react";
import { axios, apis } from "../../services";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import BlogCard from "../../components/BlogCard/BlogCard";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import {
  setGlobalFeed,
  voteHandler,
  voteCountHandler,
} from "../../redux/actions";
import { connect } from "react-redux";
import HeartLoadaer from "../../components/EntryLoader/HeartLoader";

import classes from "./GlobalFeedPage.module.css";

const GlobalFeedPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchGlobalFeed = async () => {
    setIsLoading(true);
    let voteCountObj = {};

    try {
      const result = await axios.get(apis.GET_MAIN_FEED + "/false/false");

      if (props.Auth?.isLoggedIn) {
        const voteObj = { ...props.Vote.votes };

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
      } else {
        result?.data?.data?.Items.forEach((item) => {
          voteCountObj[item.hashedUrl] = {
            likes: item.like,
            upVotes: item.upVote,
            downVotes: item.downVote,
          };
        });
      }

      if (result?.data?.data?.Items) {
        props.setGlobalFeed(result.data.data.Items);
        props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
      }
    } catch (err) {
      console.log("failed to set global feed", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!props.Feed?.globalFeed.length) {
      fetchGlobalFeed();
    }
  }, [props.Auth?.isLoggedIn]);

  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        {isLoading ? (
          <HeartLoadaer />
        ) : (
          <div>
            <div className={classes.Header}>
              <p>Global Feed</p>
            </div>
            <div
              className={classes.ReloadButton}
              onClick={() => fetchGlobalFeed()}
            >
              <i className="icon sync alternate"></i>
            </div>
            {props.Feed?.globalFeed?.map((ele, i) => {
              if (ele.postType === "blog") {
                return (
                  <BlogCard Element={ele} Type="post" key={`blg-card-${i}`} />
                );
              } else if (ele.postType === "question") {
                return (
                  <QuestionCard
                    Element={ele}
                    Type="post"
                    key={`qs-card-${i}`}
                  />
                );
              } else return null;
            })}
          </div>
        )}
      </HomeLayout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Auth: state.Auth, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  setGlobalFeed,
  voteHandler,
  voteCountHandler,
})(GlobalFeedPage);
