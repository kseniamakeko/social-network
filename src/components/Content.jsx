import React from "react";

const Content = () => {
  return (
    <div className="content">
      <div>
        <img
          className="main"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile"
        />
      </div>
      <div>
        <img
          className="ava"
          src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fHww"
          alt="wall"
        />{" "}
        + description
      </div>
      <div>My posts</div>
      <div>New posts</div>
      <div>
        <div>Post 1</div>
        <div>Post 2</div>
      </div>
    </div>
  );
};

export default Content;
