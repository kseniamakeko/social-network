import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setCurrentPage,
  setFollowingProgress,
  getUsers
} from "../Redux/UsersReducer";
import React from "react";
import Users from "./Users";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import Preloader from "../ui/preloader/Preloader";
import { compose } from "redux";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
    // this.props.setIsFetching(true);
    // usersApi
    //   .getUsers(this.props.currentPage, this.props.pageSize)
    //   .then((data) => {
    //     this.props.setIsFetching(false);
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount);
    //   });
  }

  onPageChaged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
    // this.props.setIsFetching(true);
    // this.props.setCurrentPage(pageNumber);
    // usersApi.getUsers(pageNumber, this.props.pageSize).then((data) => {
    //   this.props.setIsFetching(false);
    //   this.props.setUsers(data.items);
    // });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChaged={this.onPageChaged}
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
  return {
    users: state.users.users,
    pageSize: state.users.pageSize,
    totalUsersCount: state.users.totalUsersCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
    followingInProgress: state.users.followingInProgress
  };
};

// const mapDispatchtoProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (users) => {
//       dispatch(unfollowAC(users));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount));
//     },
//     setIsFetchingAC: (isFetching) => {
//       dispatch(setIsFetchingAC(isFetching));
//     }
//   };
// };

// export default withAuthNavigate(
//   connect(mapStatetoProps, {
//     follow,
//     unfollow,
//     setCurrentPage,
//     setFollowingProgress,
//     getUsers
//   })(UsersContainer)
// );

export default compose(
  connect(mapStatetoProps, {
    follow,
    unfollow,
    setCurrentPage,
    setFollowingProgress,
    getUsers
  }),
  withAuthNavigate
)(UsersContainer);
