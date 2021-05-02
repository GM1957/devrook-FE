import { combineReducers } from 'redux'
import Auth from "./authReducers";
import Feed from "./feedReducers"

const createRootReducer = () => {
    return combineReducers({
        Auth,
        Feed
    });
}


export default createRootReducer;
