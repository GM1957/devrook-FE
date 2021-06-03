import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import createRootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk, logger];

const configureStore = () => {
  return createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};
export default configureStore;
