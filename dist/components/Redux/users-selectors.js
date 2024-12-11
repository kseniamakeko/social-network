"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followingInProgress = exports.getIsFetching = exports.getCurrentPage = exports.getTotalUsersCount = exports.getPageSize = exports.getUsers = exports.getUsersSelector = void 0;
const reselect_1 = require("reselect");
const getUsersSelector = (state) => {
    return state.users.users;
};
exports.getUsersSelector = getUsersSelector;
exports.getUsers = (0, reselect_1.createSelector)([exports.getUsersSelector], (users) => users.filter((u) => true));
const getPageSize = (state) => {
    return state.users.pageSize;
};
exports.getPageSize = getPageSize;
const getTotalUsersCount = (state) => {
    return state.users.totalUsersCount;
};
exports.getTotalUsersCount = getTotalUsersCount;
const getCurrentPage = (state) => {
    return state.users.currentPage;
};
exports.getCurrentPage = getCurrentPage;
const getIsFetching = (state) => {
    return state.users.isFetching;
};
exports.getIsFetching = getIsFetching;
const followingInProgress = (state) => {
    return state.users.followingInProgress;
};
exports.followingInProgress = followingInProgress;
