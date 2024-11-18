import { createSelector } from "reselect";

export const getUsersSelector = (state) => {
  return state.users.users;
};
export const getUsers = createSelector([getUsersSelector], (users) =>
  users.filter((u) => true)
);

export const getPageSize = (state) => {
  return state.users.PageSize;
};

export const getTotalUsersCount = (state) => {
  return state.users.totalUsersCount;
};

export const getCurrentPage = (state) => {
  return state.users.currentPage;
};

export const getIsFetching = (state) => {
  return state.users.isFetching;
};

export const followingInProgress = (state) => {
  return state.users.followingInProgress;
};
