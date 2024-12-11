"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const ProfileReducer_1 = __importDefault(require("./ProfileReducer"));
const MessagesReducer_1 = __importDefault(require("./MessagesReducer"));
const UsersReducer_1 = __importDefault(require("./UsersReducer"));
const AuthReducer_1 = __importDefault(require("./AuthReducer"));
const redux_thunk_1 = require("redux-thunk");
const AppReducer_1 = __importDefault(require("./AppReducer"));
let reducers = (0, toolkit_1.combineReducers)({
    profile: ProfileReducer_1.default,
    messages: MessagesReducer_1.default,
    users: UsersReducer_1.default,
    auth: AuthReducer_1.default,
    app: AppReducer_1.default
});
const store = (0, toolkit_1.configureStore)({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redux_thunk_1.thunk),
    devTools: true
});
// window.__store__ = store;
exports.default = store;
