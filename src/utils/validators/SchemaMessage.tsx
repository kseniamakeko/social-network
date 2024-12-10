import * as Yup from "yup";

const validationSchemaMessage = Yup.object().shape({
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1000 or less characters")
    .required("Message is required")
});

export default validationSchemaMessage;
