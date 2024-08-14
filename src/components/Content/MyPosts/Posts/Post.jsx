import React from "react";
import classes from "./Post.module.css";

const Post = (props) => {
  return (
    <>
      <div className={classes.posts}>
        <div className={classes.item}>
          <img src="https://images.unsplash.com/photo-1475518112798-86ae358241eb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          {props.message}
        </div>
        <div>
          <span>{props.like}</span>
        </div>
      </div>
    </>
  );
};

export default Post;
