import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import SamuraiJSApp from "./App";

// function onRender(
//   id, // Profiler id prop
//   phase, // "mount" or "update"
//   actualDuration, // Time spent rendering the commit
//   baseDuration, // Estimated time without memoization
//   startTime, // When React started rendering
//   commitTime, // When React committed the changes
//   interactions // Set of interactions for this update
// ) {
//   console.log({
//     id,
//     phase,
//     actualDuration,
//     baseDuration,
//     startTime,
//     commitTime,
//     interactions
//   });
// }

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <Profiler id="App" onRender={onRender}>
  <SamuraiJSApp />
  // </Profiler>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
