import React, { useEffect, useState } from "react";
import { apis, axios } from "../../services";
import { voteHandler, voteCountHandler } from "../../redux/actions";
import { connect } from "react-redux";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import BlogCard from "../../components/BlogCard/BlogCard";
import ListOfUsersModal from "../../components/ListOfUsersModal/ListOfUsersModal";
import FollowUnfollowTagButton from "../../components/FollowUnfollowTagButton/FollowUnfollowTagButton";
import EntryLoaderRects from "../../components/EntryLoader/EntryLoaderRects";

import classes from "./InsideTagPage.module.css";

const InsideTagPage = (props) => {
  const tagName = props.match.params.tagName;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldDevsModal, setShouldDevsModal] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let voteCountObj = {};
      const voteObj = { ...props.Vote.votes };

      const result = await axios.get(
        apis.TAG_FEED + "/" + tagName + "/false/false"
      );

      setPosts(result.data.data.Items);

      const voteIds = [];

      result?.data?.data?.Items.forEach((item) => {
        voteIds.push(item.hashedUrl);
        voteCountObj[item.hashedUrl] = {
          likes: item.like,
          upVotes: item.upVote,
          downVotes: item.downVote,
        };
      });

      if (props.Auth?.isLoggedIn) {
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
      }
      if (result?.data?.data?.Items) {
        props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
      }
    } catch (err) {
      console.log("failed to fetch posts inside tag", err);
    }
    setIsLoading(false);
  };

  const devsModalCloseHandler = () => {
    setShouldDevsModal(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [tagName]);

  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <div className={classes.TagHeader}>
          {shouldDevsModal ? (
            <div className={classes.ModalArea}>
              <ListOfUsersModal
                TagName={tagName}
                Type="devsOfTag"
                CloseBtn={devsModalCloseHandler}
              />
            </div>
          ) : null}
          <div className={classes.TagName}>
            <p>#{tagName}</p>
          </div>
          <div className={classes.DevAndFollowUnfollowTagButton}>
            <div className={classes.FollowUnfollowTagButton}>
              <FollowUnfollowTagButton tagName={tagName} />
            </div>
            <div
              className={classes.DevsButton}
              onClick={() => setShouldDevsModal(true)}
            >
              <p>DEVS</p>
            </div>
          </div>
        </div>
        <div className={classes.RecentPostSection}>
          <p>Recent Posts</p>
        </div>
        <div className={classes.TagFeedArea}>
          {isLoading ? (
            <div className={classes.CenterAligner}>
              {" "}
              <EntryLoaderRects />{" "}
            </div>
          ) : !posts.length ? (
            <div className={classes.CenterAligner}>
              {" "}
              No Post Found In This Tag
            </div>
          ) : (
            posts.map((ele, i) => {
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
            })
          )}
        </div>
      </HomeLayout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Auth: state.Auth, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  voteHandler,
  voteCountHandler,
})(InsideTagPage);
