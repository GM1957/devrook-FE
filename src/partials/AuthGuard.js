import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { login } from "../redux/actions";
import EntryLoader from "../components/EntryLoader/EntryLoaderSmallBoxes";

const AuthGuard = (props) => {
  const [isAuthenticating, setAuthenticating] = useState(false);

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
  
  return isAuthenticating ? <EntryLoader/> : null;
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  login,
})(AuthGuard);
