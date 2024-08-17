import React from "react";
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";
import classes from "./Dialogs.module.css";

const Dialogs = (props) => {
  let dialogsElement = props.dialogsData.map((dialog) => (
    <DialogItems name={dialog.name} id={dialog.id} />
  ));

  let messagesElement = props.messagesData.map((message) => (
    <Message message={message.message} id={message.id} />
  ));
  return (
    <div className={classes.dialogs}>
      <div className={classes["dialogs-items"]}>{dialogsElement}</div>
      <div className={classes.messages}>{messagesElement}</div>
    </div>
  );
};

export default Dialogs;
