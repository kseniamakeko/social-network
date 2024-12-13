import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";
import messagesReducer from "./MessagesReducer";
import usersReducer from "./UsersReducer";
import authReducer from "./AuthReducer";
import { thunk as thunkMiddleware } from "redux-thunk";
import appReducer from "./AppReducer";

let rootReducers = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  users: usersReducer,
  auth: authReducer,
  app: appReducer
});

type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>;

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: true
});
// @ts-ignore
window.__store__ = store;

export default store;
