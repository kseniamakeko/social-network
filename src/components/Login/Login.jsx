import React from "react";
import { Navigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import validationSchemaLoginForm from "../../utils/validators/SchemaLoginForm";
import { validateEmail } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../Redux/AuthReducer.ts";
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
        setStatus,
        values.captcha
      )
    );
  };
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
          captcha: ""
        }}
        validate={validateEmail}
        validationSchema={validationSchemaLoginForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <>
            <h1 className={classes.title}>Login</h1>
            <LoginForm
              isSubmitting={isSubmitting}
              captchaUrl={props.captchaUrl}
              values={props.values}
            />
            {status && (
              <div className={classes["form-summary-error"]}>{status}</div>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

const LoginForm = ({ isSubmitting, captchaUrl }) => {
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
      {captchaUrl && (
        <>
          <img src={captchaUrl} alt="CAPTCHA" />
          <div>
            <Field
              name="captcha"
              type="text"
              placeholder="Symbols from image"
              component={Input}
            />
          </div>
        </>
      )}
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
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStatetoProps, { login })(Login);
