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
  return (
    <div className={classes.dialogs}>
      <div className={classes["dialogs-items"]}>
        <DialogItem name="Mila" id="1" />
        <DialogItem name="Eugine" id="2" />
        <DialogItem name="Scott" id="3" />
        <DialogItem name="Graham" id="4" />
      </div>
      <div className={classes.messages}>
        <Message message="Hi" />
        <Message message="What's new?" />
        <Message message="What's about meeting?" />
      </div>
    </div>
  );
};

export default Dialogs;
