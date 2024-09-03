import React from "react";
import Post from "../MyPosts/Posts/Post";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
  let postsElement = props.posts.map((post) => (
    <Post message={post.message} key={post.id} like={post.likesCount} />
  ));
  const newElement = React.createRef();
  const onAddPost = () => {
    props.addPost();
  };

  const onPostHandler = () => {
    const text = newElement.current.value;
    props.updateNewTextPost(text);
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
          <button onClick={onAddPost}>Add Post</button>
        </div>
      </div>
      {postsElement}
    </>
  );
};

export default MyPosts;
