import {
  createField,
  Input,
  Textarea
} from "../../common/FormsControls/FormsControls";
import { Form, Formik } from "formik";
import validationSchemaProfileDataForm from "../../../utils/validators/SchemaProfileFormData";
import { validateContacts } from "../../../utils/validators/validators";
import classes from "./InfoProfile.module.css";
import { ProfileFormData } from "../../../types/types";

type ProfileDataFormPropsType = {
  profile: ProfileFormData;
  onSubmit: (formData: ProfileFormData) => void;
  initialValues: ProfileFormData;
};

// const combineValidators =
//   (validators: Array<(value: any) => string | undefined>) => (value: any) => {
//     for (let validator of validators) {
//       const error = validator(value);
//       if (error) return error; // return the first error found
//     }
//     return undefined;
//   };

// const validateRequired = (value: any) => {
//   if (!value) return "This field is required";
//   return undefined;
// };

// const validateMinLength = (value: any) => {
//   if (value.length < 3) return "Too short";
//   return undefined;
// };

// const validate = combineValidators([validateRequired, validateMinLength]);

const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({
  profile,
  onSubmit
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          userId: profile.userId,
          fullName: profile.fullName || "",
          lookingForAJob: profile.lookingForAJob || false,
          lookingForAJobDescription: profile.lookingForAJobDescription || "",
          aboutMe: profile.aboutMe || "",
          contacts: Object.fromEntries(
            Object.entries(profile.contacts).map(([key, value]) => [
              key,
              value || ""
            ]) // Default to empty string
          ),
          photos: {
            small: profile.photos?.small || null,
            large: profile.photos?.large || null
          }
        }}
        validate={validateContacts}
        validationSchema={validationSchemaProfileDataForm}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await onSubmit(values);
          } catch (error) {
            console.error("Submission error:", error);
          } finally {
            setSubmitting(false);
            setStatus();
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className={classes.formDataProfile}>
            <div className={classes.input}>
              <b>Full Name</b>:
              {createField("FulllName", "fullname", () => undefined, Input)}
            </div>
            <div className={classes.input}>
              <b>Looking for a job</b>:
              {createField("", "lookingForAJob", () => undefined, Input, {
                type: "checkbox"
              })}
            </div>
            <div className={classes.input}>
              <b>My Professional skills</b>:
              {createField(
                "My professional skills",
                "lookingForAJobDescription",
                () => undefined,
                Textarea
              )}
            </div>
            <div className={classes.input}>
              <b>About me</b>:
              {createField("About Me", "aboutMe", () => undefined, Textarea)}
            </div>
            <div>
              <b>Contacts</b>:
              {Object.keys(profile.contacts).map((key) => {
                return (
                  <div key={key}>
                    <b>{key}</b>:
                    {createField(
                      key,
                      `contacts.${key}`,
                      () => undefined,
                      Input
                    )}
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
