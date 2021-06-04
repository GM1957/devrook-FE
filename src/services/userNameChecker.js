import { axios, apis } from "./index";
const userNameChecker = async (event) => {
  const { value, defaultUserName } = event;
  const result = await axios.get(apis.GET_USER_BY_USER_NAME + value);

  if (
    (!result.data.data.length && result.data.status) ||
    value === defaultUserName
  ) {
    return false;
  } else {
    return true;
  }
};

export default userNameChecker;
