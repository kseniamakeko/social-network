import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { Route, Routes } from "react-router-dom";
import DialogContainer from "./components/Dialogs/DialogContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Content/ProfileContainer";
import Login from "./components/Login/Login";
import "./App.css";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Nav />
      <div className="app-wrapper-content">
        <Routes>
          <Route exact path="/dialogs" element={<DialogContainer />} />
          <Route
            exact
            path="/profile/:userId?"
            element={<ProfileContainer />}
          />
          <Route exact path="/users" element={<UsersContainer />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/music" element={<Music />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
