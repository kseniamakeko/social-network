import React from "react";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Content/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { Route, Routes } from "react-router-dom";
import DialogContainer from "./components/Dialogs/DialogContainer";
import "./App.css";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Nav />
      <div className="app-wrapper-content">
        <Routes>
          <Route exact path="/dialogs" element={<DialogContainer />} />
          <Route
            exact
            path="/profile"
            element={
              <Profile
              // store={props.store}
              // posts={props.state.profile.posts}
              // dispatch={props.dispatch}
              />
            }
          />
          <Route exact path="/users" element={<UsersContainer />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/music" element={<Music />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
