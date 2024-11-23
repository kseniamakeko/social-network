import profileReducer, {
  addPostActionCreator,
  deletePost
} from "./ProfileReducer";

let state = {
  posts: [
    { id: 1, message: "How are you?", likesCount: 12 },
    { id: 2, message: "I like the world", likesCount: 11 }
  ]
};

test("length of posts should be incremented", () => {
  // 1 Test data
  let action = addPostActionCreator("it-kamasutra.com");

  // 2 action
  let newState = profileReducer(state, action);

  //3 expectetion
  expect(newState.posts.length).toBe(3);
});

test("message of  new post should be it-kamasutra.com", () => {
  // 1 Test data
  let action = addPostActionCreator("it-kamasutra.com");

  // 2 action
  let newState = profileReducer(state, action);

  //3 expectetion
  expect(newState.posts[2].message).toBe("it-kamasutra.com");
});

test("after deleting length of messages should be decrement", () => {
  // 1 Test data
  let action = deletePost(1);

  // 2 action
  let newState = profileReducer(state, action);

  //3 expectetion
  expect(newState.posts.length).toBe(1);
});

test("after deleting length  shouldn't be decrement if id is not correct", () => {
  // 1 Test data
  let action = deletePost(10000000);

  // 2 action
  let newState = profileReducer(state, action);

  //3 expectetion
  expect(newState.posts.length).toBe(2);
});
