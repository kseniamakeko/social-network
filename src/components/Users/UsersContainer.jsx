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
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
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
  console.log(state.pageSize, "pagesize");
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
  connect(mapStatetoProps, {
    follow,
    unfollow,
    setCurrentPage,
    setFollowingProgress,
    getUsers: requestUsers
  })
)(UsersContainer);
