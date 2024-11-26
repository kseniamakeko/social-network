import React from "react";

// import Preloader from "../ui/preloader/Preloader";
// import { useSelector } from "react-redux";
// import { getUsers } from "../Redux/users-selectors";
import User from "./User";
import Pagonation from "../common/FormsControls/Pagination/Pagination";

const Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  followingInProgress,
  users,
  ...props
}) => {
  // const users = useSelector(getUsers);

  // if (!users || users.length === 0) {
  //   return <Preloader />;
  // }

  return (
    <div>
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
