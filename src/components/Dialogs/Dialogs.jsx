import React from "react";
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";
import classes from "./Dialogs.module.css";

const Dialogs = (props) => {
  let dialogsElement = props.messages.dialogsData.map((dialog) => (
    <DialogItems name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let messagesElement = props.messages.messagesData.map((message) => (
    <Message message={message.message} key={message.id} id={message.id} />
  ));

  let newMessageBody = props.messages.newMassageBody;

  let onSendMessageClick = () => {
    props.sendMessage();
  };
  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
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
