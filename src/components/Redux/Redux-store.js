import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";
import messagesReducer from "./MessagesReducer";

let reducers = combineReducers({
  profile: profileReducer,
  messages: messagesReducer
});

let store = configureStore({
  reducer: reducers
});

export default store;
