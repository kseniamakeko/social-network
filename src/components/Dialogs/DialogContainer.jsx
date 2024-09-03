import Dialogs from "./Dialogs";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator
} from "../Redux/MessagesReducer";
import { connect } from "react-redux";

const mapStatetoProps = (state) => {
  return {
    messages: state.messages
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    }
  };
};

const DialogContainer = connect(mapStatetoProps, mapDispatchtoProps)(Dialogs);

export default DialogContainer;
