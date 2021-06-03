const initialState = {
  isLoggedIn: false,
  cognitoUserInfo: null,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        cognitoUserInfo: action.cognitoUserInfo,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userdetails: null,
      };
    case "SET_USER_DETAILS":
      return {
        ...state,
        userdetails: {
          ...action.payload,
        },
      };
    case "SET_USER_DETAILS_PARTIAL":
      return {
        ...state,
        userdetails: {
          ...state.userdetails,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default Auth;
