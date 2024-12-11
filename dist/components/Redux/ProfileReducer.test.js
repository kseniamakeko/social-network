"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileReducer_1 = __importStar(require("./ProfileReducer"));
let state = {
    posts: [
        { id: 1, message: "How are you?", likesCount: 12 },
        { id: 2, message: "I like the world", likesCount: 11 }
    ]
};
test("length of posts should be incremented", () => {
    // 1 Test data
    let action = (0, ProfileReducer_1.addPostActionCreator)("it-kamasutra.com");
    // 2 action
    let newState = (0, ProfileReducer_1.default)(state, action);
    //3 expectetion
    expect(newState.posts.length).toBe(3);
});
test("message of  new post should be it-kamasutra.com", () => {
    // 1 Test data
    let action = (0, ProfileReducer_1.addPostActionCreator)("it-kamasutra.com");
    // 2 action
    let newState = (0, ProfileReducer_1.default)(state, action);
    //3 expectetion
    expect(newState.posts[2].message).toBe("it-kamasutra.com");
});
test("after deleting length of messages should be decrement", () => {
    // 1 Test data
    let action = (0, ProfileReducer_1.deletePost)(1);
    // 2 action
    let newState = (0, ProfileReducer_1.default)(state, action);
    //3 expectetion
    expect(newState.posts.length).toBe(1);
});
test("after deleting length  shouldn't be decrement if id is not correct", () => {
    // 1 Test data
    let action = (0, ProfileReducer_1.deletePost)(10000000);
    // 2 action
    let newState = (0, ProfileReducer_1.default)(state, action);
    //3 expectetion
    expect(newState.posts.length).toBe(2);
});
