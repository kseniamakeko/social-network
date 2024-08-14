import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import classes from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div>
      <div>
        <img
          className={classes.main}
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile"
        />
      </div>
      <div>
        <img
          className={classes.ava}
          src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fHww"
          alt="wall"
        />{" "}
        + description
      </div>
      <MyPosts />
    </div>
  );
};

export default Profile;
