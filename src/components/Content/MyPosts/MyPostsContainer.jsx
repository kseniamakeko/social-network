import { addPostActionCreator } from "../../Redux/ProfileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStatetoProps = (state) => {
  return {
    posts: state.profile.posts
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    }
  };
};

const MyPostsContainer = connect(mapStatetoProps, mapDispatchtoProps)(MyPosts);

export default MyPostsContainer;
