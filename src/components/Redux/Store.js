import messagesReducer from "./MessagesReducer";
import profileReducer from "./ProfileReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "How are you?", likesCount: 12 },
        { id: 1, message: "I like the world", likesCount: 11 }
      ],
      newPostText: "it-kamasutra.com"
    },
    messagesPage: {
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
    }
  },
  _callSubscriber() {
    console.log("State changed");
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer(
      this._state.messagesPage,
      action
    );
    this._callSubscriber(this._state);
  }
};

window.store = store;
export default store;
