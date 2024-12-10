import * as Yup from "yup";

const validationSchemaProfileDataForm = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  lookingForAJob: Yup.boolean(),
  lookingForAJobDescription: Yup.string().required(
    "Professional skills are required"
  ),
  aboutMe: Yup.string().required("About Me is required"),
  contacts: Yup.object().shape({
    facebook: Yup.string().url("Invalid URL").nullable(),
    twitter: Yup.string().url("Invalid URL").nullable(),
    vk: Yup.string().url("Invalid URL").nullable(),
    instagram: Yup.string().url("Invalid URL").nullable(),
    github: Yup.string().url("Invalid URL").nullable(),
    youtube: Yup.string().url("Invalid URL").nullable(),
    mainLink: Yup.string().url("Invalid URL").nullable(),
    website: Yup.string().url("Invalid URL").nullable()
  })
});

export default validationSchemaProfileDataForm;
