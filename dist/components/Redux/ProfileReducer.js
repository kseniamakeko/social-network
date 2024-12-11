"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProfile = exports.savePhoto = exports.updateStatus = exports.getStatus = exports.getUserProfile = exports.savePhotoSucces = exports.setStatus = exports.setUserProfile = exports.deletePost = exports.addPostActionCreator = void 0;
const api_1 = require("../../api/api");
const api_2 = require("../../api/api");
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
let initialState = {
    posts: [
        { id: 1, message: "How are you?", likesCount: 12 },
        { id: 2, message: "I like the world", likesCount: 11 }
    ],
    profile: null,
    status: ""
};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: state.posts.length + 1,
                message: action.message,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.postId)
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            };
        default:
            return state;
    }
};
const addPostActionCreator = (message) => ({
    type: ADD_POST,
    message
});
exports.addPostActionCreator = addPostActionCreator;
const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
});
exports.deletePost = deletePost;
const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});
exports.setUserProfile = setUserProfile;
const setStatus = (status) => ({
    type: SET_STATUS,
    status
});
exports.setStatus = setStatus;
const savePhotoSucces = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
});
exports.savePhotoSucces = savePhotoSucces;
const getUserProfile = (userId) => async (dispatch) => {
    let response = await api_1.usersApi.getProfile(userId);
    dispatch((0, exports.setUserProfile)(response.data));
};
exports.getUserProfile = getUserProfile;
const getStatus = (userId) => async (dispatch) => {
    let response = await api_2.profileApi.getStatus(userId);
    dispatch((0, exports.setStatus)(response.data));
};
exports.getStatus = getStatus;
const updateStatus = (status) => async (dispatch) => {
    let response = await api_2.profileApi.upadateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch((0, exports.setStatus)(status));
    }
};
exports.updateStatus = updateStatus;
const savePhoto = (file) => async (dispatch) => {
    let response = await api_2.profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch((0, exports.savePhotoSucces)(response.data.data.photos));
    }
};
exports.savePhoto = savePhoto;
const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
        const response = await api_2.profileApi.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch((0, exports.getUserProfile)(userId));
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(response.data.messages[0]);
        }
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.saveProfile = saveProfile;
exports.default = profileReducer;
