export const validateEmail = (values: { email: string }) => {
  const errors: { email?: string } = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export const validateContacts = (values: {
  contacts: { [key: string]: string };
}) => {
  const errors: { contacts?: { [key: string]: string } } = {};
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/;
  errors.contacts = {};

  Object.keys(values.contacts).forEach((key) => {
    const value = values.contacts[key];
    if (value && !urlRegex.test(value)) {
      errors.contacts![key] = `${key} must be a valid URL`;
    }
  });

  if (Object.keys(errors.contacts).length === 0) {
    delete errors.contacts;
  }

  return errors;
};

export const validateFullName = (values: { fullName: string }) => {
  const errors: { fullName?: string } = {};
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(values.fullName)) {
    errors.fullName = "Full name can only contain letters and spaces";
  } else if (values.fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters long";
  } else if (values.fullName.length > 50) {
    errors.fullName = "Full name must not exceed 50 characters";
  }
  return errors;
};
