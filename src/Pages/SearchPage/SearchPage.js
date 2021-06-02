import React, { useState } from "react";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import { axios, apis } from "../../services";
import { connect } from "react-redux";
import { voteHandler, voteCountHandler } from "../../redux/actions";

import classes from "./SearchPage.module.css";

const SearchPage = (props) => {
  const searchtext = props.match.params.searchtext;

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    let voteCountObj = {};

    try {
      const result = await axios.get(
        apis.SEARCH_POSTS + "/" + searchtext + "/false/false"
      );
      // if user is logged in then fetch personalized posts basically here the posts will come according the tags which user follows
      if (props.Auth?.isLoggedIn) {
        // in vote obj i am already containing old votes data which user has done previously in the application
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

        console.log("Previous", previousVoteDetails);

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
      if (result?.data?.data?.Items.length) {
        setPosts(result.data.data.Items);
        props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await axios.get(
        apis.SEARCH_USERS + "/" + searchtext + "/false/false"
      );
      setUsers(result.data.data.Items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <HomeLayout></HomeLayout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  voteHandler,
  voteCountHandler,
})(SearchPage);
