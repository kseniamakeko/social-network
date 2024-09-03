import Users from "./Users";
import { connect } from "react-redux";
import { followAC, unfollowAC, setUsersAC } from "../Redux/UsersReducer";

const mapStatetoProps = (state) => {
  return {
    users: state.users.users
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (users) => {
      dispatch(unfollowAC(users));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Users);
