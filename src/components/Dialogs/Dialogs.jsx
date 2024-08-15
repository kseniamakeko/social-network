import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Dialogs.module.css";

const DialogItem = (props) => {
  let path = `/dialogs/${props.id}`;
  return (
    <div className={classes.dialog + " " + classes.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};
const Message = (props) => {
  return <div className={classes.dialog}>{props.message}</div>;
};

const Dialogs = (props) => {
  let dialogsData = [
    { id: 1, name: "Mila" },
    { id: 2, name: "Eugine" },
    { id: 3, name: "Scott" },
    { id: 4, name: "Graham" }
  ];

  let messagesData = [
    { id: 1, message: "Hi" },
    { id: 1, message: "What's new?" },
    { id: 1, message: "What's about meeting?" }
  ];

  let dialogsElement = dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  let messagesElement = messagesData.map((message) => (
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
