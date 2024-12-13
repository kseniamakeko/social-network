import React from "react";

import { useSelector } from "react-redux";
import { getUsers } from "../Redux/users-selectors";
import User from "./User";
import Pagonation from "../common/FormsControls/Pagination/Pagination";
import classes from "./Users.module.css";
import { UsersType } from "../../types/types";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  users: Array<UsersType>;
};

const Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  followingInProgress,
  users,
  ...props
}) => {
  // const users: Array<UsersType> = useSelector(getUsers);

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
          followingInProgress={followingInProgress}
          key={u.id}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  );
};

export default Users;
