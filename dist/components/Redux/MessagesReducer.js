"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageCreator = void 0;
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
    newMessageBody: ""
};
const messagesReducer = (state = initialState, action) => {
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
const sendMessageCreator = (message) => ({
    type: SEND_MESSAGE,
    message
});
exports.sendMessageCreator = sendMessageCreator;
exports.default = messagesReducer;
