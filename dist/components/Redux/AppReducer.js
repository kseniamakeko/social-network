"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = exports.initializedSuccess = void 0;
const AuthReducer_1 = require("./AuthReducer");
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
let initialState = {
  initialized: null
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};
const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS
});
exports.initializedSuccess = initializedSuccess;
const initializeApp = () => (dispatch) => {
  let promise = dispatch((0, AuthReducer_1.getAuthUserData)());
  Promise.all([promise]).then(() => {
    dispatch((0, exports.initializedSuccess)());
  });
};
exports.initializeApp = initializeApp;
exports.default = appReducer;
