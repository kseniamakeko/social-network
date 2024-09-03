import {
  addPostActionCreator,
  updateNewTextPostActionCreator
} from "../../Redux/ProfileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStatetoProps = (state) => {
  return {
    posts: state.profile.posts,
    newPostText: state.profile.newPostText
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    updateNewTextPost: (text) => {
      dispatch(updateNewTextPostActionCreator(text));
    }
  };
};

const MyPostsContainer = connect(mapStatetoProps, mapDispatchtoProps)(MyPosts);

export default MyPostsContainer;
