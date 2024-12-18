import { Dispatch, Action } from "redux";
import { usersApi } from "../../api/api";
import { profileApi } from "../../api/api";
import { PhotosType, ProfileType, PostType } from "../../types/types";
import { AppStateType } from "./Redux-store";
import { ThunkAction } from "redux-thunk";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
  posts: [
    { id: 1, message: "How are you?", likesCount: 12 },
    { id: 2, message: "I like the world", likesCount: 11 }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ""
};

export type initialSateType = typeof initialState;

type ActionsType =
  | addPostActionCreatorType
  | deletePostActoinCreatorType
  | setUserProfileActionCreatorType
  | setStatusActionCreatorType
  | savePhotoSuccesActionCreatorType;

const profileReducer = (state = initialState, action: ActionsType) => {
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

type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  Action<string>
>;

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch: DispatchType) => {
    let userData = await usersApi.getProfile(userId);
    dispatch(setUserProfile(userData));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch: DispatchType) => {
    let statusData = await profileApi.getStatus(userId);
    dispatch(setStatus(statusData));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch: DispatchType) => {
    let dataUpdateStatus = await profileApi.upadateStatus(status);
    if (dataUpdateStatus.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };

export const savePhoto =
  (file: unknown): ThunkType =>
  async (dispatch: DispatchType) => {
    let savePhotoData = await profileApi.savePhoto(file);

    if (savePhotoData.resultCode === 0) {
      dispatch(savePhotoSucces(savePhotoData.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      if (userId === null) throw new Error("User ID is null");

      const response = await profileApi.saveProfile(profile);

      if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));
      } else {
        return Promise.reject(response.messages[0]);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      return Promise.reject(error);
    }
  };

export default profileReducer;
