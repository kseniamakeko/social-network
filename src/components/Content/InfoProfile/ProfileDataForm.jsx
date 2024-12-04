import {
  createField,
  Input,
  Textarea
} from "../../common/FormsControls/FormsControls";
import { Form, Formik } from "formik";
import validationSchemaProfileDataForm from "../../../utils/validators/SchemaProfileFormData";
import {
  validateFullName,
  validateContacts
} from "../../../utils/validators/validators.js";
import classes from "./InfoProfile.module.css";

const ProfileDataForm = ({ profile, onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSubmitting(false);
      setStatus();
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          userId: profile.userId,
          fullName: profile.fullName || "",
          lookingForAJob: profile.lookingForAJob || false,
          lookingForAJobDescription: profile.lookingForAJobDescription || "",
          aboutMe: profile.aboutMe || "",
          contacts: {
            facebook: null,
            twitter: null,
            vk: null,
            instagram: null,
            github: null,
            youtube: null,
            mainLink: null,
            website: null
          }
        }}
        validate={(validateFullName, validateContacts)}
        validationSchema={validationSchemaProfileDataForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className={classes.formDataProfile}>
            <div className={classes.input}>
              <b>Full Name</b>:{createField("FulllName", "fullname", [], Input)}
            </div>
            <div className={classes.input}>
              <b>Looking for a job</b>:
              {createField("", "lookingForAJob", [], Input, {
                type: "checkbox"
              })}
            </div>
            <div className={classes.input}>
              <b>My Professional skills</b>:
              {createField(
                "My professional skills",
                "lookingForAJobDescription",
                [],
                Textarea
              )}
            </div>
            <div className={classes.input}>
              <b>About me</b>:{createField("About Me", "aboutMe", [], Textarea)}
            </div>
            <div>
              <b>Contacts</b>:
              {Object.keys(profile.contacts).map((key) => {
                return (
                  <div key={key}>
                    <b>{key}</b>:
                    {createField(key, `contacts.${key}`, null, Input)}
                  </div>
                );
              })}
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </div>
            {status && <div className={classes["form-summary-error"]}></div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileDataForm;
