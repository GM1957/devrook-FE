import React, { useEffect, useState } from "react";
import Layout from "../../../hoc/Layout";
import HomeLayout from "../../../hoc/HomeLayout/HomeLayout";

import EditProfileButton from "../EditProfileButton/EditProfileButton";
import RookLogo from "../../../assets/images/devrooklogo.png";

import { axios, apis } from "../../../services";
import { connect } from "react-redux";
import { login, setUserDetails } from "../../../redux/actions";
import classes from "./ProfileDetails.module.css";

const ProfileDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  // here checking if the user is checking his own profile or not and setting the default value of the user accordingly for fast performence

  const checkOwnersProfile = () => {
    if (props.userName === props.Auth?.cognitoUserInfo?.attributes?.profile) {
      let details = { ...props.Auth.userdetails };
      delete details.userId;

      props.setProfileDetails(details);

      if (!Object.keys(details).length) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      if (!props.Auth.isLoggedIn) setIsLoading(true);

      const fetchedUser = await axios.get(
        apis.GET_USER_BY_USER_NAME + props.userName
      );
      console.log("fetched user", fetchedUser);

      if (!fetchedUser.data.data.length || !fetchedUser.data.status) {
        props.setProfileDetails("notFound");
      } else {
        props.setProfileDetails(fetchedUser.data.data[0]);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    checkOwnersProfile();
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <div>
          <div className={classes.ProfileCard}>
            {isLoading ? (
              <h1>Loading ...</h1>
            ) : (
              <div>
                <div className={classes.HeaderAnimation}>
                  <div className={classes.Stars}></div>
                  <div className={classes.Stars2}></div>
                  <div className={classes.Stars3}></div>
                </div>

                <img
                  src={
                    props.profileDetails?.profilePicture?.length
                      ? "https://upload.wikimedia.org/wikipedia/commons/archive/6/6c/20190526100514%21User_icon_3.svg"
                      : RookLogo
                  }
                  alt="UserImage"
                  className={classes.UserPic}
                />

                <div className={classes.UserInfo}>
                  <div className={classes.Row}>
                    <div className={classes.Column}>
                      <div className={classes.BasicDetails}>
                        <p className={classes.Name}>
                          {props.profileDetails?.name}
                        </p>
                        <p className={classes.UserName}>
                          @{props.profileDetails?.userName}
                        </p>
                        <p className={classes.Email}>
                          ✉️ {props.profileDetails?.email}
                        </p>
                        <p className={classes.Bio}>
                          {props.profileDetails?.bio}
                        </p>

                        <div className={classes.FollowersFollowing}>
                          <p className={classes.Reputation}>
                            <i className="icon chess king"></i>{" "}
                            <b>
                              {props.profileDetails?.reputation / 1000 > 1
                                ? (
                                    props.profileDetails?.reputation / 1000
                                  ).toFixed(1) + "k"
                                : props.profileDetails?.reputation}
                            </b>
                          </p>
                          <a href="/" className={classes.Following}>
                            Following <b>{props.profileDetails?.following} </b>
                          </a>{" "}
                          <a href="/" className={classes.Follower}>
                            Followers <b>{props.profileDetails?.followers}</b>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className={classes.Column}>
                      <div className={classes.ButtonsSection}>
                        <div className={classes.EditOrFollowButton}>
                          <EditProfileButton />
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
            )}
          </div>
        </div>
      </HomeLayout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  login,
  setUserDetails,
})(ProfileDetails);
