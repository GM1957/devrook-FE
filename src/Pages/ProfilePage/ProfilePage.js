import React, { useState } from "react";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";

import ProfileDetails from "../../components/UserProfile/ProfileDetails/ProfileDetails";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import NotFound404 from "../../components/NotFound404/NotFound404";
import classes from "./ProfilePage.module.css";

const ProfilePage = (props) => {
  const userName = props.match.params.username;
  const [profileDetails, setProfileDetails] = useState(null);

  return (
    <div>
      {profileDetails === "notFound" ? (
        <NotFound404 />
      ) : (
        <Layout>
          <HomeLayout isRightBar={true}>
            <ProfileDetails
              profileDetails={profileDetails}
              setProfileDetails={setProfileDetails}
              userName={userName}
            />
          </HomeLayout>
        </Layout>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {
  login,
})(ProfilePage);
