import React, { useState } from "react";
import ProfileDetails from "../../components/UserProfile/ProfileDetails/ProfileDetails";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import NotFound404 from "../../components/NotFound404/NotFound404";

const ProfilePage = (props) => {
  const [profileDetails, setProfileDetails] = useState(null);

  const userName = props.match.params.username;

  return (
    <div>
      {profileDetails === "notFound" ? (
        <NotFound404 />
      ) : (
        <ProfileDetails profileDetails={profileDetails} setProfileDetails={setProfileDetails} userName={userName}/>
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
