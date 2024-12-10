import * as Yup from "yup";

const validationSchemaPost = Yup.object().shape({
  post: Yup.string()
    .min(1, "Post must be at least 10 characters")
    .max(100, "Must be shorter than 10000 characters")
    .required("Post is required")
});

export default validationSchemaPost;
