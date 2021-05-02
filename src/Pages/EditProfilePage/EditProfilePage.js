import React, { useState, useEffect } from "react";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import { login } from "../../redux/actions";
import { apis, axios } from "../../services";
import { connect } from "react-redux";
import { userNameChecker } from "../../services";
import NotFound404 from "../../components/NotFound404/NotFound404";
import RookLogo from "../../assets/images/devrooklogo.png";
import classes from "./EditProfilePage.module.css";
import HeartLoader from "../../components/EntryLoader/HeartLoader";

const EditProfilePage = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentSelected, setSelected] = useState({});

  const [userNameStatus, setUserNameStatus] = useState("passed");

  const userNameOnChangeHandler = async (value) => {
    setUserNameStatus("checking");

    onChangeHandler("userName", value);

    const result = await userNameChecker({
      value,
      defaultUserName: props.Auth?.cognitoUserInfo?.attributes?.profile,
    });
    if (!result) {
      setUserNameStatus("passed");
    } else {
      setUserNameStatus("failed");
    }
  };

  const onChangeHandler = (key, value) => {
    let oldSelected = { ...currentSelected };
    oldSelected[key] = value;
    setSelected(oldSelected);
  };

  useEffect(() => {
    if (currentSelected?.userName?.length < 1) setUserNameStatus("failed");
  }, [userNameStatus]);

  const onSubmitHandler = async () => {
    if (userNameStatus === "passed") {
      setIsLoading(true);
      try {
        await axios.put(apis.UPDATE_USER, currentSelected);
        window.location.href = "/profile/edit"
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (props.Auth?.userdetails) {
      setCurrentUser(props.Auth.userdetails);

      //never fetch from current user it will give undefine
      const {
        userName,
        bio,
        linkedinLink,
        githubLink,
        twitterLink,
        location,
      } = props.Auth.userdetails;
      setSelected({
        userName,
        bio,
        linkedinLink,
        githubLink,
        twitterLink,
        location,
      });
      setIsLoading(false);
    }
  }, [props.Auth?.userdetails]);

  return (
    <div>
      {currentUser === "notfound" ? (
        <NotFound404 />
      ) : (
        <div>
          <Layout>
            <HomeLayout isRightBar={true}>
              {isLoading ? (
                <HeartLoader/>
              ) : (
                <div className={classes.EditPageContainer}>
                  <div className={classes.ProfilePicContainer}>
                    <img
                      className={classes.ProfilePic}
                      src={
                        currentUser?.profilePicture.length
                          ? currentUser?.profilePicture
                          : RookLogo
                      }
                      alt="profile pic"
                    />
                  </div>

                  <div className={classes.HeadingSection}>
                    <div className={classes.HeadingNameSection}>
                      <p className={classes.HeadingName}>{currentUser?.name}</p>
                    </div>
                    <div className={classes.HeadingButtonSection}>
                      {userNameStatus === "passed" ? (
                        <button
                          onClick={() => onSubmitHandler()}
                          className={classes.HeadingButton}
                        >
                          Save
                        </button>
                      ) : (
                        <button className={classes.HeadingDisabledButton}>
                          Save
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={classes.InputsContainer}>
                    <label className={classes.InputsLabel}>
                      User Name
                      <span>
                        {userNameStatus === "passed" ? (
                          <i
                            className="check icon"
                            style={{ color: "green", marginLeft: "10px" }}
                          />
                        ) : userNameStatus === "checking" ? (
                          <div className={classes.CheckLoader}> </div>
                        ) : (
                          <i
                            className="x icon"
                            style={{ color: "red", marginLeft: "10px" }}
                          />
                        )}
                      </span>
                    </label>
                    <input
                      className={
                        userNameStatus === "failed"
                          ? classes.FailedInput
                          : classes.Inputs
                      }
                      onChange={(event) =>
                        userNameOnChangeHandler(event.target.value)
                      }
                      value={currentSelected?.userName}
                      type="text"
                    />

                    <label className={classes.InputsLabel}>Short Bio</label>
                    <input
                      className={classes.Inputs}
                      onChange={(event) =>
                        onChangeHandler("bio", event.target.value)
                      }
                      value={currentSelected?.bio}
                      type="text"
                    />

                    <label className={classes.InputsLabel}>Github link</label>
                    <input
                      className={classes.Inputs}
                      onChange={(event) =>
                        onChangeHandler("githubLink", event.target.value)
                      }
                      value={currentSelected?.githubLink}
                      type="text"
                    />

                    <label className={classes.InputsLabel}>Linkedin link</label>
                    <input
                      className={classes.Inputs}
                      onChange={(event) =>
                        onChangeHandler("linkedinLink", event.target.value)
                      }
                      value={currentSelected?.linkedinLink}
                      type="text"
                    />

                    <label className={classes.InputsLabel}>Twitter link</label>
                    <input
                      className={classes.Inputs}
                      onChange={(event) =>
                        onChangeHandler("twitterLink", event.target.value)
                      }
                      value={currentSelected?.twitterLink}
                      type="text"
                    />

                    <label className={classes.InputsLabel}>Location</label>
                    <input
                      className={classes.Inputs}
                      onChange={(event) =>
                        onChangeHandler("location", event.target.value)
                      }
                      value={currentSelected?.location}
                      type="text"
                    />
                  </div>
                </div>
              )}
            </HomeLayout>
          </Layout>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  login,
})(EditProfilePage);
