import Dialogs from "./Dialogs";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator
} from "../Redux/MessagesReducer";
import { connect } from "react-redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { compose } from "redux";

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

export default compose(
  withAuthNavigate,
  connect(mapStatetoProps, mapDispatchtoProps)
)(Dialogs);
