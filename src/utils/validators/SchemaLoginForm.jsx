import * as Yup from "yup";

const validationSchemaLoginForm = Yup.object().shape({
  password: Yup.string()
    .min(5, "Must be longer than 2 characters")
    .max(20, "Must be shorter than 5 characters")
    .required("Password is required"),
  captcha: Yup.string().when("captchaUrl", {
    is: (captchaUrl) => !!captchaUrl,
    then: Yup.string().required("Captcha is required")
  })
});

export default validationSchemaLoginForm;
