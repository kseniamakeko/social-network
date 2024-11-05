import {
  applyMiddleware,
  combineReducers,
  configureStore
} from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";
import messagesReducer from "./MessagesReducer";
import usersReducer from "./UsersReducer";
import authReducer from "./AuthReducer";
import { thunk as thunkMiddleware } from "redux-thunk";

let reducers = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  users: usersReducer,
  auth: authReducer
});

let store = configureStore({
  reducer: reducers,
  thunkMiddleware: applyMiddleware(thunkMiddleware)
});

window.store = store;

export default store;
