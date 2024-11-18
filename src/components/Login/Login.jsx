import React from "react";
import { Navigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import validationSchemaLoginForm from "../../utils/validators/SchemaLoginForm";
import validateEmail from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../Redux/AuthReducer";
import classes from "./Login.module.css";

const Login = (props) => {
  const dispatch = useDispatch();

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    dispatch(
      login(
        values.email,
        values.password,
        values.rememberMe,
        setSubmitting,
        setStatus
      )
    );
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validate={validateEmail}
        validationSchema={validationSchemaLoginForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <>
            <h1 className={classes.title}>Login</h1>
            <LoginForm isSubmitting={isSubmitting} />
            {status && (
              <div className={classes["form-summary-error"]}>{status}</div>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

const LoginForm = ({ isSubmitting }) => {
  return (
    <Form className={classes.loginContainer}>
      <div className={classes.formField}>
        <Field
          name={"email"}
          type={"text"}
          placeholder={"Email"}
          component={Input}
        />
      </div>
      <div className={classes.formField}>
        <Field
          name={"password"}
          type={"password"}
          placeholder={"Password"}
          component={Input}
        />
      </div>
      <div className={classes.checkboxContainer}>
        <Field type={"checkbox"} name={"rememberMe"} id="rememberMe" />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <div>
        <button
          className={classes.loginButtonForm}
          type={"submit"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </Form>
  );
};

const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStatetoProps, { login })(Login);
