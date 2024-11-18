import React from "react";
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
        <input {...field} {...restProps} />
      </div>
    </FormsControls>
  );
};
