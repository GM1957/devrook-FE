import { combineReducers } from 'redux'
import Auth from "./authReducers";

const createRootReducer = () => {
    return combineReducers({
        Auth
    });
}


export default createRootReducer;
