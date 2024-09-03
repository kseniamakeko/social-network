import React from "react";
import classes from "./Users.module.css";

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        photoUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        followed: false,
        fullName: "Ksenia",
        status: "Everything at once",
        location: { country: "Kazakhstan", city: "Astana" }
      },
      {
        id: 2,
        photoUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
        followed: true,
        fullName: "Anatolii",
        status: "I can",
        location: { country: "Kazakhstan", city: "Astana" }
      },
      {
        id: 3,
        photoUrl:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        followed: true,
        fullName: "Julia",
        status: "Work",
        location: { country: "USA", city: "Los-Angeles" }
      }
    ]);
  }

  return (
    <div className={classes.users}>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  unfollow
                </button>
              ) : (
                <button
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
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
