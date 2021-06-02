import { combineReducers } from "redux";
import Auth from "./authReducers";
import Feed from "./feedReducers";
import Vote from "./voteReducers";
import Trending from "./trendingReducers";

const createRootReducer = () => {
  return combineReducers({
    Auth,
    Feed,
    Vote,
    Trending,
  });
};

export default createRootReducer;
