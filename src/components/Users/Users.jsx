import React from "react";
import userPhoto from "../../assets/image/userPic.png";
import classes from "./Users.module.css";
import Preloader from "../ui/preloader/Preloader";
import { useSelector } from "react-redux";
import { getUsers } from "../Redux/users-selectors";

const Users = (props) => {
  const users = useSelector(getUsers);
  const {
    totalUsersCount,
    pageSize,
    currentPage,
    onPageChanged,
    follow,
    unfollow
  } = props;

  if (!users || users.length === 0) {
    return <Preloader />;
  }

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((page) => {
          return (
            <span
              className={currentPage === page && classes.selectedPage}
              onClick={(e) => {
                onPageChanged(page);
              }}
            >
              {page}
            </span>
          );
        })}
      </div>
      {users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img
                src={u.photos.small != null ? u.photos.small : userPhoto}
                alt=""
                className={classes.userPhoto}
              />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{u.location?.country}</div>
                <div>{u.location?.city}</div>
              </span>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
