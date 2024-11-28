import { usersApi } from "../../api/api";
import { profileApi } from "../../api/api";

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
        message: action.payload,
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
        posts: state.posts.filter((p) => p.id !== action.payload)
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

export const addPostActionCreator = (post) => ({
  type: ADD_POST,
  payload: post
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status
});

export const savePhotoSucces = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersApi.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileApi.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileApi.upadateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  console.log("photoFile", file);
  console.log(process.env.API_KEY);

  let response = await profileApi.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSucces(response.data.data.photos));
  }
};

export default profileReducer;
