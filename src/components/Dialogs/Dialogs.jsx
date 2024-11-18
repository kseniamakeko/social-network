import React from "react";
import { Form, Formik, Field } from "formik";
import { sendMessageCreator } from "../Redux/MessagesReducer";
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";
import validationSchemaMessage from "../../utils/validators/SchemaMessage";
import { Textarea } from "../common/FormsControls/FormsControls";
import classes from "./Dialogs.module.css";

const Dialogs = ({ messages, dispatch }) => {
  let dialogsElement = messages.dialogsData.map((dialog) => (
    <DialogItems name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let messagesElement = messages.messagesData.map((message) => (
    <Message message={message.message} key={message.id} id={message.id} />
  ));

  return (
    <div className={classes.dialogs}>
      <div className={classes["dialogs-items"]}>{dialogsElement}</div>
      <div className={classes.messages}>
        <div>{messagesElement} </div>
        <AddMessageForm dispatch={dispatch} />
      </div>
    </div>
  );
};

const AddMessageForm = ({ dispatch }) => {
  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={validationSchemaMessage}
      onSubmit={(values, { resetForm }) => {
        dispatch(sendMessageCreator(values.message));
        resetForm();
      }}
    >
      {({ isValid }) => (
        <Form className={classes.formContainer}>
          <div>
            <Field
              component={Textarea}
              name="message"
              placeholder="Enter your message"
              className={classes.textarea}
            />
          </div>
          <div>
            <button
              className={`${classes.sendButton} ${
                !isValid ? classes.sendButtonDisabled : ""
              }`}
              type="submit"
              disabled={!isValid}
            >
              Send
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Dialogs;
