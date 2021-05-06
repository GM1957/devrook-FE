import { combineReducers } from 'redux'
import Auth from "./authReducers";
import Feed from "./feedReducers";
import Vote from "./voteReducers"

const createRootReducer = () => {
    return combineReducers({
        Auth,
        Feed,
        Vote
    });
}


export default createRootReducer;
