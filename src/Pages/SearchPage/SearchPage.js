import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HeartLoader from "../../components/EntryLoader/HeartLoader";
import BlogCard from "../../components/BlogCard/BlogCard";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import { axios, apis } from "../../services";
import { connect } from "react-redux";
import { voteHandler, voteCountHandler } from "../../redux/actions";

import classes from "./SearchPage.module.css";

const SearchPage = (props) => {
  const searchtext = props.match.params.searchtext;
  const [searchType, setSearchType] = useState("post");
  const [isLoading, setIsLeading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    let voteCountObj = {};
    setIsLeading(true);
    try {
      setPosts([]);
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
      toast.error("Internal server error");
      console.log(err);
    }
    setIsLeading(false);
  };

  const fetchUsers = async () => {
    try {
      const result = await axios.get(
        apis.SEARCH_USERS + "/" + searchtext + "/false/false"
      );
      setUsers(result.data.data.Items);
    } catch (err) {
      toast.error("Internal server error");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [searchtext, props?.Auth?.isLoggedIn]);

  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        {isLoading ? (
          <HeartLoader />
        ) : searchType === "post" ? (
          <div>
            <div className={classes.SearchResultHeader}>
              <p>Search Results</p>
            </div>
            <div
              className={classes.UserPostButton}
              onClick={() => setSearchType("user")}
            >
              Users
            </div>
            {posts.length ? (
              <div className={classes.PostResultSection}>
                {posts.map((ele, i) => {
                  if (ele.postType === "blog") {
                    return (
                      <BlogCard
                        Element={ele}
                        Type="post"
                        key={`blg-card-${i}`}
                      />
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
            ) : (
              <div className={classes.NotFound}>
                <p>Sorry 😥 No Posts Found</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className={classes.SearchResultHeader}>
              <p>Search Results</p>
            </div>
            <div
              className={classes.UserPostButton}
              onClick={() => setSearchType("post")}
            >
              Posts
            </div>
            {users.length ? (
              <div>
                {users.map((user, i) => {
                  return (
                    <div className={classes.UserCard} key={"user-card" + i}>
                      <ProfileCard Author={user} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={classes.NotFound}>
                <p>Sorry 😥 No Users Found</p>
              </div>
            )}
          </div>
        )}
      </HomeLayout>
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
