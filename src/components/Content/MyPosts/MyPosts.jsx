import React from "react";
import Post from "../MyPosts/Posts/Post";
import {
  addPostActionCreator,
  updateNewTextPostActionCreator
} from "../../Redux/ProfileReducer";

import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
  let postsElement = props.posts.map((post) => (
    <Post message={post.message} like={post.likesCount} />
  ));
  const newElement = React.createRef();
  const addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  const onPostHandler = () => {
    const text = newElement.current.value;
    props.dispatch(updateNewTextPostActionCreator(text));
  };

  return (
    <>
      <div className={classes.postBlock}>
        <h3>My posts</h3>
      </div>
      <div>
        <div>
          <textarea
            onChange={onPostHandler}
            ref={newElement}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={addPost}>Add Post</button>
        </div>
      </div>
      {postsElement}
    </>
  );
};

export default MyPosts;
