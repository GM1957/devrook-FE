import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
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
      const cognitoUser = await Auth.currentAuthenticatedUser();
      props.login(cognitoUser);
    } catch (err) {
      console.log(err);
    } finally {
      setAuthenticating(false);
    }
  };
  
  useEffect(() => {
    return authenticate();
  }, [props.Auth.isLoggedIn]);

  useEffect(() => {
    if (props.Auth.isLoggedIn) {
      if (!props.Auth.cognitoUserInfo.profile) setFirstLogin(true);
    }
    return isFirstLogin;
  }, [props.Auth.isLoggedIn]);

  console.log("isFirstLogin",isFirstLogin);
  
  return isFirstLogin ? <FirstLoginPage/> : isAuthenticating ? <EntryLoader/> : <RouteHandler/>;
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  login,
})(AuthGuard);
