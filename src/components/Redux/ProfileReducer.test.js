import profileReducer, { addPostActionCreator } from "./ProfileReducer";

test("length of posts should be incremented", () => {
  // 1 Test data
  let action = addPostActionCreator("it-kamasutra.com");
  let state = {
    posts: [
      { id: 1, message: "How are you?", likesCount: 12 },
      { id: 1, message: "I like the world", likesCount: 11 }
    ]
  };

  // 2 action

  let newState = profileReducer(state, action);

  //3 expectetion
  expect(newState.posts.length).toBe(3);
});
