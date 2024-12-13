import React, { ReactNode, FC } from "react";
import {
  Field,
  FieldInputProps,
  FieldProps,
  FormikErrors,
  FormikTouched
} from "formik";
import classes from "./FormsControls.module.css";

type FormControlsProps = {
  field: FieldInputProps<any>;
  form: {
    touched: FormikTouched<any>;
    errors: FormikErrors<any>;
  };
  children: ReactNode;
};

const FormsControls: FC<FormControlsProps> = ({ field, form, children }) => {
  const hasError =
    (form.touched[field.name] as boolean | undefined) &&
    (form.errors[field.name] as string | undefined);

  return (
    <div
      className={
        classes["form-control"] + " " + (hasError ? classes.error : "")
      }
    >
      <div>{children}</div>
      {hasError && <span>{hasError}</span>}
    </div>
  );
};

type InputTextareaProps = FieldProps & {
  [key: string]: any;
};

export const Textarea: FC<InputTextareaProps> = (props) => {
  const { field, form, child, ...restProps } = props;
  return (
    <FormsControls field={field} form={form}>
      <textarea {...field} {...restProps} />
    </FormsControls>
  );
};

export const Input: FC<InputTextareaProps> = (props) => {
  const { field, form, ...restProps } = props;
  return (
    <FormsControls field={field} form={form}>
      <div className={classes.formField}>
        <input {...field} {...restProps} value={field.value || ""} />
      </div>
    </FormsControls>
  );
};

type createFieldProps = {
  placeholder: string;
  name: string;
  validators?: (value: any) => string | undefined;
  component: React.ComponentType<FieldProps>;
  props?: Record<string, any>;
  text?: string;
};

export const createField = (
  placeholder: string,
  name: string,
  validators: (value: any) => string | undefined,
  component: React.ComponentType<FieldProps>,
  props: Record<string, any> = {},
  text: string = ""
): React.JSX.Element => {
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
