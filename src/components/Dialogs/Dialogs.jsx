import React from "react";
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";
import classes from "./Dialogs.module.css";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator
} from "../Redux/MessagesReducer";

const Dialogs = (props) => {
  let state = props.store.getState().messagesPage;

  let dialogsElement = props.dialogsData.map((dialog) => (
    <DialogItems name={dialog.name} id={dialog.id} />
  ));
  let messagesElement = props.messagesData.map((message) => (
    <Message message={message.message} id={message.id} />
  ));

  let newMessageBody = state.newMassageBody;
  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };
  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };
  return (
    <div className={classes.dialogs}>
      <div className={classes["dialogs-items"]}>{dialogsElement}</div>
      <div className={classes.messages}>
        <div>{messagesElement} </div>
        <div>
          <textarea
            value={newMessageBody}
            placeholder="Enter your message"
            onChange={onNewMessageChange}
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
