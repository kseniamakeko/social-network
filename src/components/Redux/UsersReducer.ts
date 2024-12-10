import { usersApi } from "../../api/api";
import { updateObjectInArray } from "../../utils/object-helpers/object-helpers";
import { UsersType } from "../../types/types";

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
  followingInProgress: []
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {
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
      return { ...state, totalUsersCount: action.payload };
    }

    case SET_IS_FETCHING: {
      return { ...state, isFetching: action.payload };
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

export const setUsers = (users: UsersType): setUsersActionCreatorType => ({
  type: SET_USERS,
  users
});
type setUsersActionCreatorType = {
  type: typeof SET_USERS;
  users: UsersType;
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

export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  payload: totalUsersCount
});

export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING,
  payload: isFetching
});
export const setFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    const data = await usersApi.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setIsFetching(false));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  userId,
  dispatch,
  apiMethod,
  actionCreator
) => {
  dispatch(setFollowingProgress(true, userId));
  const response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(setFollowingProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      userId,
      dispatch,
      usersApi.follow.bind(usersApi),
      followSucess
    );
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      userId,
      dispatch,
      usersApi.unfollow.bind(usersApi),
      unfollowSucess
    );
  };
};

export default usersReducer;
