import { usersApi } from "../../api/api";
import { profileApi } from "../../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "How are you?", likesCount: 12 },
    { id: 1, message: "I like the world", likesCount: 11 }
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

    default:
      return state;
  }
};

export const addPostActionCreator = (post) => ({
  type: ADD_POST,
  payload: post
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status
});

export const getUserProfile = (userId) => (dispatch) => {
  usersApi.getProfile(userId).then((reponse) => {
    dispatch(setUserProfile(reponse.data));
  });
};

export const getStatus = (userId) => (dispatch) => {
  profileApi.getStatus(userId).then((reponse) => {
    dispatch(setStatus(reponse.data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileApi.upadateStatus(status).then((reponse) => {
    if (reponse.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
