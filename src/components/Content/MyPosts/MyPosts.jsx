import React from "react";
import Post from "../MyPosts/Posts/Post";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
  return (
    <>
      <div>My posts</div>
      <div>
        <textarea></textarea>
        <button>send</button>
      </div>

      <Post message="It's my first post!" like="5" />
      <Post message="How are you?" like="3" />
    </>
  );
};

export default MyPosts;
