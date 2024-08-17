let state = {
  profilePage: {
    posts: [
      { id: 1, message: "How are you?", likesCount: 12 },
      { id: 1, message: "I like the world", likesCount: 11 }
    ]
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
      { id: 1, message: "What's new?" },
      { id: 1, message: "What's about meeting?" }
    ]
  }
};

export default state;
