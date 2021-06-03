import { Auth } from "aws-amplify";
import { axios } from "../../services";

const login = (cognitoUserInfo) => {
  axios.defaults.headers.common["Authorization"] =
    cognitoUserInfo.signInUserSession.idToken.jwtToken;
  localStorage.setItem(
    "access_token",
    cognitoUserInfo.signInUserSession.idToken.jwtToken
  );
  localStorage.setItem(
    "refresh_token",
    cognitoUserInfo.signInUserSession.refreshToken.token
  );
  return {
    type: "LOGIN",
    cognitoUserInfo,
  };
};

const logout = () => async (dispatch) => {
  try {
    await Auth.signOut();
    dispatch({
      type: "LOGOUT",
    });
    dispatch({
      type: "REMOVE_DATA",
    });
  } catch (err) {
    console.log(err);
  }
};

const setUserDetails = (user) => {
  return {
    type: "SET_USER_DETAILS",
    payload: user,
  };
};

const setPartialDetails = (user) => {
  return {
    type: "SET_USER_DETAILS_PARTIAL",
    payload: user,
  };
};

export { login, logout, setUserDetails, setPartialDetails };
