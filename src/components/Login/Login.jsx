import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchemaLoginForm from "./FormValidation/SchemaLoginForm";

import classes from "./Login.module.css";

const validateEmail = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const Login = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validate={validateEmail}
        validationSchema={validationSchemaLoginForm}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
        }}
      >
        {() => (
          <>
            <h1 className={classes.title}>Login</h1>
            <LoginForm />
          </>
        )}
      </Formik>
    </div>
  );
};

const LoginForm = () => {
  return (
    <Form className={classes.loginContainer}>
      <div className={classes.formField}>
        <Field name={"email"} type={"text"} placeholder={"Email"} />
        <ErrorMessage
          name="email"
          component="div"
          className={classes.errorMessage}
        />
      </div>

      <div className={classes.formField}>
        <Field name={"password"} type={"password"} placeholder={"Password"} />
        <ErrorMessage
          name="password"
          component="div"
          className={classes.errorMessage}
        />
      </div>

      <div className={classes.checkboxContainer}>
        <Field type={"checkbox"} name={"rememberMe"} id="rememberMe" />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>

      <div>
        <button type={"submit"}>Login</button>
      </div>
    </Form>
  );
};

export default Login;
