import React, { useState, useEffect } from "react";
import { axios, apis } from "../../../services";
import BlogCard from "../../BlogCard/BlogCard";
import {
  setFeedBlogs,
  isPersonalizedBlogsFetched,
  voteHandler
} from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./BlogsFeed.module.css";
import HeartLoadaer from "../../EntryLoader/HeartLoader";

const BlogsFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    let result = {};
    if (props.Auth?.isLoggedIn) {
      // in vote obj i am already containing old votes data which user has done previously in the application
      const voteObj = { ...props.Vote.votes };

      result = await axios.post(apis.GET_PERSONALIZED_BLOGS + "/false/false");

      const voteIds = result?.data?.data?.Items.map((item) => item.hashedUrl);

      const previousVoteDetails = await axios.post(
        apis.GET_USER_PREVIOUS_VOTES,
        { voteIds }
      );

      previousVoteDetails.data.data.forEach(item => {
        voteObj[item[0]?.voteId] = item[0]?.voteType
      })

      console.log("voteObj", voteObj);
      props.voteHandler(voteObj)

      props.isPersonalizedBlogsFetched(true);
    } else {
      result = await axios.get(apis.GET_ALL_BLOGS + "/false/false");
    }
    if (result?.data?.data?.Items) {
      props.setFeedBlogs(result.data.data.Items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!props.Feed?.blogsFeed.length) {
      fetchBlogs();
    }

    // i had to make universal flag to check if personalized blogs fetched for not because for this if (!props.Feed?.blogsFeed.length) important check check i was unable to update blog feed because the initial value of props.Auth?.isLoggedIn is false and for that blogsFeed was getting length and 2nd time when isLoggedIn is true for that check i was not able to fetch and update blogFeed with personalized blogs
    if (!props.Feed?.isPersonalizedBlogsFetched) {
      if (props.Auth?.isLoggedIn) {
        fetchBlogs();
      }
    }
  }, [props.Auth?.isLoggedIn]);

  return (
    <div>
      {isLoading ? (
        <HeartLoadaer />
      ) : (
        <div>
          <div className={classes.ReloadButton} onClick={() => fetchBlogs()}>
            <i className="icon sync alternate"></i>
          </div>
          {props.Feed?.blogsFeed?.map((ele, i) => {
            return <BlogCard Index={i} Element={ele} key={`blg-card-${i}`} />;
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
  setFeedBlogs,
  isPersonalizedBlogsFetched,
  voteHandler
})(BlogsFeed);
