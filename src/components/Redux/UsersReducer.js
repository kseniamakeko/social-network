import { usersApi } from "../../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
  users: [],
  pageSize: 10,
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
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        })
      };

    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        })
      };
    }

    case SET_USERS: {
      return { ...state, users: action.payload.users };
    }

    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }

    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.payload.totalUsersCount };
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

export const followSucess = (userId) => ({
  type: FOLLOW,
  userId
});

export const unfollowSucess = (userId) => ({
  type: UNFOLLOW,
  userId
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: { users }
});
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

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

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));

    const data = await usersApi.getUsers(page, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setIsFetching(false));
  };
};

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(setFollowingProgress(true, userId));
    usersApi.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSucess(userId));
      }
      dispatch(setFollowingProgress(false, userId));
    });
  };
};

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(setFollowingProgress(true, userId));
    usersApi.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followSucess(userId));
      }
      dispatch(setFollowingProgress(false, userId));
    });
  };
};

export default usersReducer;
