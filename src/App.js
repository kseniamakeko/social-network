import React, { useEffect } from "react";
import { connect } from "react-redux";
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
import { compose } from "redux";
import { initializeApp } from "./components/Redux/AppReducer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/Redux/Redux-store";

import "./App.css";
import Preloader from "./components/ui/preloader/Preloader";

const App = (props) => {
  useEffect(() => {
    props.initializeApp();
  }, [props]);

  if (!props.initialized) {
    return <Preloader />;
  }
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

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

const AppContainer = compose(connect(mapStateToProps, { initializeApp })(App));
const SamuraiJSApp = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default SamuraiJSApp;
