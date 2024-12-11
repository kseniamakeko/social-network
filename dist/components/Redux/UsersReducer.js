"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollow = exports.follow = exports.requestUsers = exports.setFollowingProgress = exports.setIsFetching = exports.setTotalUsersCount = exports.setCurrentPage = exports.setUsers = exports.unfollowSucess = exports.followSucess = void 0;
const api_1 = require("../../api/api");
const object_helpers_1 = require("../../utils/object-helpers/object-helpers");
// import { Dispatch } from "redux";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: (0, object_helpers_1.updateObjectInArray)(state.users, action.userId, "id", {
                    followed: true
                })
            };
        case UNFOLLOW: {
            return {
                ...state,
                users: (0, object_helpers_1.updateObjectInArray)(state.users, action.userId, "id", {
                    followed: false
                })
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            };
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.setTotalUsersCount };
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId)
            };
        }
        default:
            return state;
    }
};
const followSucess = (userId) => ({
    type: FOLLOW,
    userId
});
exports.followSucess = followSucess;
const unfollowSucess = (userId) => ({
    type: UNFOLLOW,
    userId
});
exports.unfollowSucess = unfollowSucess;
const setUsers = (users) => ({
    type: SET_USERS,
    users
});
exports.setUsers = setUsers;
const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
});
exports.setCurrentPage = setCurrentPage;
const setTotalUsersCount = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
});
exports.setTotalUsersCount = setTotalUsersCount;
const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING,
    isFetching
});
exports.setIsFetching = setIsFetching;
const setFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});
exports.setFollowingProgress = setFollowingProgress;
const requestUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch((0, exports.setIsFetching)(true));
        dispatch((0, exports.setCurrentPage)(currentPage));
        const data = await api_1.usersApi.getUsers(currentPage, pageSize);
        dispatch((0, exports.setUsers)(data.items));
        dispatch((0, exports.setIsFetching)(false));
        dispatch((0, exports.setTotalUsersCount)(data.totalCount));
    };
};
exports.requestUsers = requestUsers;
const followUnfollowFlow = async (userId, dispatch, apiMethod, actionCreator) => {
    dispatch((0, exports.setFollowingProgress)(true, userId));
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch((0, exports.setFollowingProgress)(false, userId));
};
const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(userId, dispatch, api_1.usersApi.follow.bind(api_1.usersApi), exports.followSucess);
    };
};
exports.follow = follow;
const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(userId, dispatch, api_1.usersApi.unfollow.bind(api_1.usersApi), exports.unfollowSucess);
    };
};
exports.unfollow = unfollow;
exports.default = usersReducer;
