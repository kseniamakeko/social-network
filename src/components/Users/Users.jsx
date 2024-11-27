import React from "react";

import { useSelector } from "react-redux";
import { getUsers } from "../Redux/users-selectors";
import User from "./User";
import Pagonation from "../common/FormsControls/Pagination/Pagination";
import classes from "./Users.module.css";

const Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  followingInProgress,
  ...props
}) => {
  const users = useSelector(getUsers);

  return (
    <div className={classes.usersPage}>
      <Pagonation
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((u) => (
        <User
          user={u}
          followingInProgress={props.followingInProgress}
          key={u.id}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  );
};

export default Users;
