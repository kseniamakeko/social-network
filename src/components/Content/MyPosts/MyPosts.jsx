import React from "react";
import { useSelector } from "react-redux";
import { addPostActionCreator } from "../../Redux/ProfileReducer";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import Post from "./Posts/Post";
import validationSchemaPost from "../../../utils/validators/SchemaPost";
import { Textarea } from "../../common/FormsControls/FormsControls";
import classes from "./MyPosts.module.css";

const MyPosts = () => {
  const posts = useSelector((state) => state.profile.posts);

  let postsElement = posts.map((post) => (
    <Post key={post.id} message={post.message} like={post.likesCount} />
  ));

  return (
    <>
      <div className={classes.postBlock}>
        <h3>My posts</h3>
      </div>
      <div>
        <AddMyPostForm />
      </div>
      {postsElement}
    </>
  );
};

const AddMyPostForm = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ post: "" }}
      validationSchema={validationSchemaPost}
      onSubmit={(values, { resetForm }) => {
        dispatch(addPostActionCreator(values.post));
        resetForm();
      }}
    >
      {({ isValid }) => (
        <Form className={classes.form__post}>
          <div className={classes.form__container}>
            <Field
              className={classes.textarea__post}
              component={Textarea}
              name="post"
              placeholder={"Post message"}
            />
          </div>
          <div>
            <button
              className={`${classes.buttonPost} ${
                !isValid ? classes.buttonPostDisabled : ""
              }`}
              type="submit"
              disabled={!isValid}
            >
              Add Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyPosts;
