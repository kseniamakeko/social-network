import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";
import messagesReducer from "./MessagesReducer";
import usersReducer from "./UsersReducer";

let reducers = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  users: usersReducer
});

let store = configureStore({
  reducer: reducers
});

window.store = store;

export default store;
