import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { login } from "../redux/actions";
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
    } catch (err) {
      console.log(err);
    } finally {
      setAuthenticating(false);
    }
  };

  useEffect(() => {
    return authenticate();
  }, []);

  useEffect(() => {
    if (props.Auth.isLoggedIn) {
      if (!props.Auth.cognitoUserInfo.attributes.profile) {
        setFirstLogin(true);
      }
    }
  }, [props.Auth.isLoggedIn, props.Auth.cognitoUserInfo?.attributes.profile]);

  return isFirstLogin ? (
    <FirstLoginPage />
  ) : isAuthenticating ? (
    <EntryLoader />
  ) : (
    <RouteHandler />
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  login,
})(AuthGuard);
