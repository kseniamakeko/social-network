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

class UsersContainer extends React.Component {
  componentDidMount() {
    console.log("this.props in componentDidMount:", this.props);
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    console.log("this.props in componentDidMount:", this.props);
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

const mapStatetoProps = (state) => {
  console.log("State in mapStateToProps:", state);

  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state) || 10,
    isFetching: getIsFetching(state) || false,
    followingInProgress: followingInProgress(state)
  };
};

export default compose(
  connect(mapStatetoProps, {
    follow,
    unfollow,
    setCurrentPage,
    setFollowingProgress,
    requestUsers
  })
)(UsersContainer);
