const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogsData: [
    { id: 1, name: "Mila" },
    { id: 2, name: "Eugine" },
    { id: 3, name: "Scott" },
    { id: 4, name: "Graham" }
  ],
  messagesData: [
    { id: 1, message: "Hi" },
    { id: 2, message: "What's new?" },
    { id: 3, message: "What's about meeting?" }
  ],
  newMassageBody: ""
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = state.newMassageBody;
      return {
        ...state,
        newMassageBody: "",
        messagesData: [
          ...state.messagesData,
          { id: state.messagesData.length + 1, message: body }
        ]
      };
    }
    case UPDATE_NEW_MESSAGE_BODY: {
      return { ...state, newMassageBody: action.body };
    }
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({
  type: SEND_MESSAGE
});

export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body
});

export default messagesReducer;
