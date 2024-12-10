const SEND_MESSAGE = "SEND-MESSAGE";

type messageType = {
  id: number;
  message: string;
};

type dialogsType = {
  id: number;
  name: string;
};

let initialState = {
  dialogsData: [
    { id: 1, name: "Mila" },
    { id: 2, name: "Eugine" },
    { id: 3, name: "Scott" },
    { id: 4, name: "Graham" }
  ] as Array<dialogsType>,
  messagesData: [
    { id: 1, message: "Hi" },
    { id: 2, message: "What's new?" },
    { id: 3, message: "What's about meeting?" }
  ] as Array<messageType>,
  newMessageBody: ""
};

export type initialSateType = typeof initialState;

const messagesReducer = (
  state = initialState,
  action: any
): initialSateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: state.messagesData.length + 1, message: action.message }
        ]
      };
    }
    default:
      return state;
  }
};

type sendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  message: string;
};

export const sendMessageCreator = (
  message: string
): sendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  message
});

export default messagesReducer;
