import React from "react";
import userPhoto from "../../assets/image/userPic.png";
import classes from "./Users.module.css";
import { NavLink } from "react-router-dom";

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push([i]);

    return (
      <>
        <div className={classes.users}>
          {pages.map((page) => (
            <span
              key={page}
              className={
                props.currentPage === page
                  ? `${classes.page} ${classes.selectedPage}`
                  : classes.page
              }
              onClick={() => {
                props.onPageChaged(page);
              }}
            >
              {page}
            </span>
          ))}

          {props.users.map((u) => (
            <div key={u.id}>
              <span>
                <div>
                  <NavLink to={`/profile/${u.id}`}>
                    <img
                      src={u.photos.small !== null ? u.photos.small : userPhoto}
                      alt=""
                    />
                  </NavLink>
                </div>
                <div>
                  {u.followed ? (
                    <button
                      disabled={props.followingInProgress.some(
                        (id) => id === u.id
                      )}
                      onClick={() => {
                        props.unfollow(u.id);
                      }}
                    >
                      unfollow
                    </button>
                  ) : (
                    <button
                      disabled={props.followingInProgress.some(
                        (id) => id === u.id
                      )}
                      onClick={() => {
                        props.follow(u.id);
                      }}
                    >
                      follow
                    </button>
                  )}
                </div>
              </span>
              <span>
                <span>
                  <div>{u.name}</div>
                  <div>{u.status}</div>
                </span>
                <span>
                  <div>{"u.location.country"}</div>
                  <div>{"u.location.city"}</div>
                </span>
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Users;
