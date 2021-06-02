import React, { useState, useEffect } from "react";
import { setUserDetails } from "../../redux/actions";
import { apis, axios } from "../../services";
import { connect } from "react-redux";
import classes from "./FollowUnfollowTagButton.module.css";

const FollowUnfollowTagButton = (props) => {
  const tagName = props.tagName;
  const FollowButton = (
    <div className={classes.FollowButton} onClick={() => followTagHandler()}>
      Follow
    </div>
  );
  const UnFollowButton = (
    <div
      className={classes.UnfollowButton}
      onClick={() => unfollowTagHandler()}
    >
      Unfollow
    </div>
  );
  const [buttonToShow, setButtonToShow] = useState(FollowButton);

  const checkIfIfollowTag = () => {
    console.log("my tags", props.Auth?.userdetails);
    const myFollowingTags = props.Auth?.userdetails?.tags;
    if (myFollowingTags) {
      if (myFollowingTags[tagName]) {
        setButtonToShow(UnFollowButton);
      } else {
        setButtonToShow(FollowButton);
      }
    }
  };

  const unfollowTagHandler = async () => {
    setButtonToShow(FollowButton);
    try {
      await axios.post(apis.UNFOLLOW_TAG, { tagName });
      const oldTags = { ...props.Auth?.userdetails?.tags };
      delete oldTags[tagName];
      console.log("after unfollowing", {
        ...props.Auth?.userdetails,
        tags: { ...oldTags },
      });
      props.setUserDetails({
        ...props.Auth?.userdetails,
        tags: { ...oldTags },
      });
    } catch (err) {
      console.log(err);
      setButtonToShow(UnFollowButton);
    }
  };

  const followTagHandler = async () => {
    setButtonToShow(UnFollowButton);
    try {
      await axios.post(apis.FOLLOW_TAG, { tagName });
      const anotherOldTags = { ...props.Auth.userdetails.tags };
      anotherOldTags[tagName] = "1";
      props.setUserDetails({
        ...props.Auth?.userdetails,
        tags: { ...anotherOldTags },
      });
    } catch (err) {
      setButtonToShow(FollowButton);
    }
  };

  useEffect(() => {
    checkIfIfollowTag();
  }, [props.Auth?.userdetails]);

  return <div>{buttonToShow}</div>;
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  setUserDetails,
})(FollowUnfollowTagButton);
