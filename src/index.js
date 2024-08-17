import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import state from "./components/Redux/State";

// let posts = [
//   { id: 1, message: "How are you?", likesCount: 12 },
//   { id: 1, message: "I like the world", likesCount: 11 }
// ];

// let dialogsData = [
//   { id: 1, name: "Mila" },
//   { id: 2, name: "Eugine" },
//   { id: 3, name: "Scott" },
//   { id: 4, name: "Graham" }
// ];

// let messagesData = [
//   { id: 1, message: "Hi" },
//   { id: 1, message: "What's new?" },
//   { id: 1, message: "What's about meeting?" }
// ];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App state={state} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
