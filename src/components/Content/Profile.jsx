import React from "react";

import InfoProfile from "./InfoProfile/InfoProfile";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
// import classes from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div>
      <InfoProfile />
      <MyPostsContainer
      // store={props.store}
      // posts={props.posts}
      // dispatch={props.dispatch}
      // newPostText={props.newPostText}
      />
    </div>
  );
};

export default Profile;
