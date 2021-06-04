import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { login, setUserDetails } from "../redux/actions";
import { apis, axios } from "../services";
import EntryLoader from "../components/EntryLoader/EntryLoaderSmallBoxes";
import RouteHandler from "./RouteHandler";
import FirstLoginPage from "../Pages/FirstLoginPage/FirstLoginPage";

const AuthGuard = (props) => {
  const [isAuthenticating, setAuthenticating] = useState(false);
  const [isFirstLogin, setFirstLogin] = useState(false);

  const authenticate = async () => {
    try {
      setAuthenticating(true);
      const cognitoUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      props.login(cognitoUser);

      setAuthenticating(false);
    } catch (err) {
      console.log(err);
      setAuthenticating(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const DBuser = await axios.post(apis.GET_USER_BY_USER_ID, {});
        props.setUserDetails(DBuser.data.data[0]);
      } catch (err) {
        console.log("failed to fetch user data", err);
      }
    }
    if (props.Auth.isLoggedIn) {
      if (!props.Auth?.cognitoUserInfo?.attributes?.zoneinfo) {
        setFirstLogin(true);
      } else {
        fetchUserData();
      }
    }
  }, [
    props.Auth.isLoggedIn,
    props.Auth?.cognitoUserInfo?.attributes?.zoneinfo,
  ]);

  return isFirstLogin ? (
    <FirstLoginPage />
  ) : isAuthenticating ? (
    <EntryLoader />
  ) : (
    <RouteHandler />
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};

export default connect(mapStateToProps, {
  login,
  setUserDetails,
})(AuthGuard);
