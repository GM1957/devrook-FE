import React, { useState, useEffect } from "react";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import FollowUnfollowTagButton from "../../components/FollowUnfollowTagButton/FollowUnfollowTagButton";

import { connect } from "react-redux";
import { login } from "../../redux/actions";
import classes from "./TagsFollowedByMePage.module.css";

const TagsFollowedByMePage = (props) => {
  const [allTags, setAllTags] = useState([]);
  const [needReRender, setNeedReRender] = useState(true);

  const fetchAllTags = () => {
    if (props?.Auth?.userdetails) {
      const myTags = Object.keys(props.Auth?.userdetails?.tags);
      setAllTags(myTags);
      setNeedReRender(false);
    }
  };

  useEffect(() => {
    if (needReRender) fetchAllTags();
  }, [props.Auth?.userdetails]);

  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <div className={classes.Container}>
          <div className={classes.Header}>
            <p>My Tags</p>
          </div>
          <div className={classes.AllTagsCard}>
            <div className={classes.Row}>
              {allTags.map((tag, i) => (
                <div className={classes.Column} key={"tag-col" + i}>
                  <div className={classes.TagCard}>
                    <p>#{tag}</p>
                    <div className={classes.FollowUnfollowButton}>
                      <FollowUnfollowTagButton tagName={tag} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
})(TagsFollowedByMePage);
