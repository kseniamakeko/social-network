import { usersApi } from "../../api/api";
import { profileApi } from "../../api/api";
import { PhotosType, ProfileType } from "../../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

type postType = {
  id: number;
  message: string;
  likesCount: number;
};

let initialState = {
  posts: [
    { id: 1, message: "How are you?", likesCount: 12 },
    { id: 2, message: "I like the world", likesCount: 11 }
  ] as Array<postType>,
  profile: null as ProfileType | null,
  status: ""
};

export type initialSateType = typeof initialState;

const profileReducer = (state = initialState, action: any) => {
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
        profile: { ...state.profile, photos: action.photos } as ProfileType
      };

    default:
      return state;
  }
};

export const addPostActionCreator = (
  message: string
): addPostActionCreatorType => ({
  type: ADD_POST,
  message
});
type addPostActionCreatorType = {
  type: typeof ADD_POST;
  message: string;
};

export const deletePost = (postId: number): deletePostActoinCreatorType => ({
  type: DELETE_POST,
  postId
});
type deletePostActoinCreatorType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const setUserProfile = (
  profile: ProfileType
): setUserProfileActionCreatorType => ({
  type: SET_USER_PROFILE,
  profile
});
type setUserProfileActionCreatorType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setStatus = (status: string): setStatusActionCreatorType => ({
  type: SET_STATUS,
  status
});
type setStatusActionCreatorType = {
  type: typeof SET_STATUS;
  status: string;
};

export const savePhotoSucces = (
  photos: PhotosType
): savePhotoSuccesActionCreatorType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});
type savePhotoSuccesActionCreatorType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let response = await usersApi.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileApi.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  let response = await profileApi.upadateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileApi.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSucces(response.data.data.photos));
  }
};

export const saveProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    try {
      const response = await profileApi.saveProfile(profile);

      if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
        return Promise.resolve(response);
      } else {
        return Promise.reject(response.data.messages[0]);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

export default profileReducer;
