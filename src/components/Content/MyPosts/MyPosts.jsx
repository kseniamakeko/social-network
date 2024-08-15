import React from "react";
import Post from "../MyPosts/Posts/Post";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
  let postsData = [
    { id: 1, message: "How are you?", likesCount: 12 },
    { id: 1, message: "I like the world", likesCount: 11 }
  ];

  let postsElement = postsData.map((post) => (
    <Post message={post.message} like={post.likesCount} />
  ));
  return (
    <>
      <div>My posts</div>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>send</button>
        </div>
      </div>
      {postsElement}
    </>
  );
};

export default MyPosts;
