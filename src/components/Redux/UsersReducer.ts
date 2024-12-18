import { usersApi } from "../../api/api";
import { updateObjectInArray } from "../../utils/object-helpers/object-helpers";
import { UsersType } from "../../types/types";
import { Action, Dispatch } from "redux";
import { AppStateType } from "./Redux-store";
import { ThunkAction } from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
  users: [] as Array<UsersType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> // array of users id
};

type initialStateType = typeof initialState;

type ActionsType =
  | followSucessActionCreatorType
  | unfollowSucessActionCreatorType
  | setFollowingProgressActionCreator
  | setIsFetchingActionCreator
  | setUsersActionCreatorType
  | setCurrentPageActionCreatorType
  | setTotalUsersCountActionCreatorType;

const usersReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true
        })
      };

    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
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
      return { ...state, totalUsersCount: action.totalUsersCount };
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
type followSucessActionCreatorType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSucess = (
  userId: number
): followSucessActionCreatorType => ({
  type: FOLLOW,
  userId
});

type unfollowSucessActionCreatorType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowSucess = (
  userId: number
): unfollowSucessActionCreatorType => ({
  type: UNFOLLOW,
  userId
});

export const setUsers = (
  users: Array<UsersType>
): setUsersActionCreatorType => ({
  type: SET_USERS,
  users
});
type setUsersActionCreatorType = {
  type: typeof SET_USERS;
  users: Array<UsersType>;
};

export const setCurrentPage = (
  currentPage: number
): setCurrentPageActionCreatorType => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
type setCurrentPageActionCreatorType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setTotalUsersCount = (
  totalUsersCount: number
): setTotalUsersCountActionCreatorType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount
});
type setTotalUsersCountActionCreatorType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};

export const setIsFetching = (
  isFetching: boolean
): setIsFetchingActionCreator => ({
  type: SET_IS_FETCHING,
  isFetching
});

type setIsFetchingActionCreator = {
  type: typeof SET_IS_FETCHING;
  isFetching: boolean;
};
export const setFollowingProgress = (
  isFetching: boolean,
  userId: number
): setFollowingProgressActionCreator => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

type setFollowingProgressActionCreator = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  Action<string>
>;

export const requestUsers = (
  currentPage: number,
  pageSize: number
): ThunkType => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    const data = await usersApi.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setIsFetching(false));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  userId: number,
  dispatch: DispatchType,
  apiMethod: any,
  actionCreator: (
    userId: number
  ) => followSucessActionCreatorType | unfollowSucessActionCreatorType
) => {
  dispatch(setFollowingProgress(true, userId));
  const response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(setFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    _followUnfollowFlow(
      userId,
      dispatch,
      usersApi.follow.bind(usersApi),
      followSucess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch: DispatchType) => {
    _followUnfollowFlow(
      userId,
      dispatch,
      usersApi.unfollow.bind(usersApi),
      unfollowSucess
    );
  };
};

export default usersReducer;
