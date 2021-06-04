import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditProfileButton from "../EditProfileButton/EditProfileButton";
import FollowUserButton from "../FollowUserButton/FollowUserButton";
import UnfollowUserButtton from "../UnfollowUserButton/UnfollowUserButton";
import RookLogo from "../../../assets/images/devrooklogo.png";
import HeartLoader from "../../EntryLoader/HeartLoader";
import EntryLoaderRects from "../../EntryLoader/EntryLoaderRects";

import ChatButton from "../ChatButton/ChatButton";
import BlogCard from "../../BlogCard/BlogCard";
import QuestionCard from "../../QuestionCard/QuestionCard";
import ListOfUsersModal from "../../ListOfUsersModal/ListOfUsersModal";

import { axios, apis } from "../../../services";
import { connect } from "react-redux";
import {
  login,
  setUserDetails,
  voteHandler,
  voteCountHandler,
} from "../../../redux/actions";
import classes from "./ProfileDetails.module.css";

const ProfileDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState("loading");
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [shouldChatButton, setShouldChatButton] = useState(true);
  const [rightButton, setRightButton] = useState(
    <div className={classes.LoadingButton}>
      <div className="ui small active centered inline loader"></div>
    </div>
  );

  const buttonChangerHandler = (currentType) => {
    if (currentType === "follow")
      setRightButton(
        <UnfollowUserButtton
          changer={buttonChangerHandler}
          userName={props.userName}
        />
      );
    if (currentType === "unfollow")
      setRightButton(
        <FollowUserButton
          changer={buttonChangerHandler}
          userName={props.userName}
        />
      );
  };

  // here checking if the user is checking his own profile or not and setting the default value of the user accordingly for fast performence

  const checkOwnersProfile = async () => {
    if (props.userName === props.Auth?.cognitoUserInfo?.attributes?.profile) {
      setRightButton(<EditProfileButton />);
      setShouldChatButton(false);

      let details = { ...props.Auth.userdetails };
      delete details.userId;

      props.setProfileDetails(details);

      if (!Object.keys(details).length) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    } else if (
      props.Auth?.isLoggedIn &&
      props.userName !== props.Auth?.cognitoUserInfo?.attributes?.profile
    ) {
      setShouldChatButton(true);
      const checker = await axios.post(apis.FOLLOW_CHECKER, {
        userName: props.userName,
      });

      checker.data?.data?.length
        ? setRightButton(
            <UnfollowUserButtton
              changer={buttonChangerHandler}
              userName={props.userName}
            />
          )
        : setRightButton(
            <FollowUserButton
              changer={buttonChangerHandler}
              userName={props.userName}
            />
          );
    } else {
      setRightButton(
        <FollowUserButton
          changer={buttonChangerHandler}
          userName={props.userName}
        />
      );
    }
  };

  const fetchUserDetails = async () => {
    try {
      if (!props.Auth.isLoggedIn) setIsLoading(true);

      if (props.userName !== props.Auth?.cognitoUserInfo?.attributes?.profile)
        setIsLoading(true);

      const fetchedUser = await axios.get(
        apis.GET_USER_BY_USER_NAME + props.userName
      );

      if (!fetchedUser.data.data.length || !fetchedUser.data.status) {
        props.setProfileDetails("notFound");
      } else {
        props.setProfileDetails(fetchedUser.data.data[0]);
      }

      setIsLoading(false);
    } catch (err) {
      toast.error("Internal server error, failed to fetch user details");
      setIsLoading(false);
      console.log("failed to fetch user details", err);
    }
  };

  const fetchPosts = async () => {
    let result = {};
    let voteCountObj = {};

    try {
      // if user is logged in then fetch personalized posts basically here the posts will come according the tags which user follows
      if (props.Auth?.isLoggedIn) {
        // in vote obj i am already containing old votes data which user has done previously in the application
        const voteObj = { ...props.Vote.votes };

        result = await axios.get(
          apis.DEV_POSTS + "/" + props.userName + "/false/false"
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
      } else {
        result = await axios.get(
          apis.DEV_POSTS + "/" + props.userName + "/false/false"
        );
        result?.data?.data?.Items.forEach((item) => {
          voteCountObj[item.hashedUrl] = {
            likes: item.like,
            upVotes: item.upVote,
            downVotes: item.downVote,
          };
        });
      }
      if (result?.data?.data?.Items.length) {
        setResponseStatus("found");
        setPosts(result.data.data.Items);
        props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
      } else {
        setResponseStatus("notFound");
      }
    } catch (err) {
      toast.error("Internal server error, failed to fetch user posts");
      console.log("failed to fetch user posts", err);
    }
  };

  useEffect(() => {
    checkOwnersProfile();
  }, [props.userName, props.Auth?.isLoggedIn]);

  useEffect(() => {
    fetchUserDetails();
    fetchPosts();
  }, [props.userName, props.Auth?.isLoggedIn]);

  const followingsModalCloseHandler = () => {
    setIsShowFollowing(false);
  };
  const followersModalCloseHandler = () => {
    setIsShowFollowers(false);
  };

  return (
    <div>
      {isLoading ? (
        <HeartLoader />
      ) : (
        <div>
          <div className={classes.ProfileCard}>
            {isShowFollowing ? (
              <div className={classes.ModalArea}>
                <ListOfUsersModal
                  UserName={props.userName}
                  Type="followings"
                  CloseBtn={followingsModalCloseHandler}
                />
              </div>
            ) : null}
            {isShowFollowers ? (
              <div className={classes.ModalArea}>
                <ListOfUsersModal
                  UserName={props.userName}
                  Type="followers"
                  CloseBtn={followersModalCloseHandler}
                />
              </div>
            ) : null}
            <div className={classes.HeaderAnimation}>
              <div className={classes.Stars}></div>
              <div className={classes.Stars2}></div>
              <div className={classes.Stars3}></div>
            </div>

            <img
              src={
                props.profileDetails?.profilePicture?.length
                  ? props.profileDetails?.profilePicture
                  : RookLogo
              }
              alt="UserImage"
              className={classes.UserPic}
            />

            <div className={classes.UserInfo}>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <div className={classes.BasicDetails}>
                    <p className={classes.Name}>{props.profileDetails?.name}</p>
                    <p className={classes.UserName}>
                      @{props.profileDetails?.userName}
                    </p>
                    <p className={classes.Email}>
                      ✉️ {props.profileDetails?.email}
                    </p>
                    <p className={classes.Bio}>{props.profileDetails?.bio}</p>

                    <div className={classes.FollowersFollowing}>
                      <p className={classes.Reputation}>
                        <i className="icon chess king"></i>
                        <b>
                          {props.profileDetails?.reputation / 1000 > 1
                            ? (props.profileDetails?.reputation / 1000).toFixed(
                                1
                              ) + "k"
                            : props.profileDetails?.reputation}
                        </b>
                      </p>
                      <div
                        className={classes.Following}
                        onClick={() => setIsShowFollowing(true)}
                      >
                        <p>
                          Following <b>{props.profileDetails?.following} </b>
                        </p>
                      </div>
                      <div
                        className={classes.Follower}
                        onClick={() => setIsShowFollowers(true)}
                      >
                        <p>
                          Followers <b>{props.profileDetails?.followers}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={classes.Column}>
                  <div className={classes.ButtonsSection}>
                    <div className={classes.BigButtonsSection}>
                      {shouldChatButton ? (
                        <div className={classes.ChatButton}>
                          <ChatButton userName={props.userName} />
                        </div>
                      ) : null}

                      <div className={classes.EditOrFollowButton}>
                        {rightButton}
                      </div>
                    </div>
                    <div className={classes.SocialLinks}>
                      <a
                        rel="noreferrer"
                        href={props.profileDetails?.githubLink}
                        target="_blank"
                      >
                        <i className="icon github" />
                      </a>
                      <a
                        rel="noreferrer"
                        href={props.profileDetails?.twitterLink}
                        target="_blank"
                      >
                        <i className="icon twitter" />
                      </a>
                      <a
                        rel="noreferrer"
                        href={props.profileDetails?.linkedinLink}
                        target="_blank"
                      >
                        <i className="icon linkedin" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.RecentPostSection}>
            <p>Recent Posts</p>
          </div>

          <div>
            {responseStatus === "loading" ? (
              <div className={classes.ResponseLoader}>
                <EntryLoaderRects />
              </div>
            ) : responseStatus === "notFound" ? (
              <div className={classes.ResponseLoader}>
                {" "}
                <p>No Previous Post Found</p>{" "}
              </div>
            ) : (
              <div>
                {" "}
                <div>
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  login,
  setUserDetails,
  voteHandler,
  voteCountHandler,
})(ProfileDetails);
