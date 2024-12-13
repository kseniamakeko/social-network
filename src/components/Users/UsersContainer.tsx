import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setCurrentPage,
  setFollowingProgress,
  requestUsers
} from "../Redux/UsersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../ui/preloader/Preloader";
import { compose } from "redux";
import {
  getUsers,
  followingInProgress,
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getIsFetching
} from "../Redux/users-selectors";
import { UsersType } from "../../types/types";
import { AppStateType } from "../Redux/Redux-store";

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
};

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  users: Array<UsersType>;
  totalUsersCount: number;
  followingInProgress: Array<number>;
};

type OwnPropsType = {
  pageTitle: string;
};

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          totalUsersCount={this.props.totalUsersCount}
        />
      </>
    );
  }
}

const mapStatetoProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: followingInProgress(state)
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStatetoProps,
    {
      follow,
      unfollow,
      getUsers: requestUsers
    }
  )
)(UsersContainer);
