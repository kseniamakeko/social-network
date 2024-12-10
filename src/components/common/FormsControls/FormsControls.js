import React from "react";
import { Field } from "formik";
import classes from "./FormsControls.module.css";

const FormsControls = ({ field, form, ...props }) => {
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <div
      className={
        classes["form-control"] + " " + (hasError ? classes.error : "")
      }
    >
      <div>{props.children}</div>
      {hasError && <span>{form.errors[field.name]}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  const { field, form, child, ...restProps } = props;
  return (
    <FormsControls {...props}>
      <textarea {...field} {...restProps} />
    </FormsControls>
  );
};

export const Input = (props) => {
  const { field, form, child, ...restProps } = props;
  return (
    <FormsControls {...props}>
      <div className={classes.formField}>
        <input {...field} {...restProps} value={field.value || ""} />
      </div>
    </FormsControls>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text && <span>{text}</span>}
    </div>
  );
};
