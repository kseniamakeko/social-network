import React, { useEffect, lazy } from "react";
import { connect } from "react-redux";
import HeaderContainer from "./components/Header/HeaderContainer";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { initializeApp } from "./components/Redux/AppReducer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/Redux/Redux-store";
import Preloader from "./components/ui/preloader/Preloader";

import "./App.css";
import withSuspense from "./hoc/withSuspense";

const DialogContainer = lazy(() =>
  import("./components/Dialogs/DialogContainer")
);

const ProfileContainer = lazy(() =>
  import("./components/Content/ProfileContainer")
);
const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
const Login = lazy(() => import("./components/Login/Login"));

const DialogContainerWithSuspense = withSuspense(DialogContainer);
const ProfileContainerWithSuspense = withSuspense(ProfileContainer);
const UsersContainerWithSuspense = withSuspense(UsersContainer);
const LoginWithSuspense = withSuspense(Login);

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
          <Route
            exact
            path="/dialogs"
            element={<DialogContainerWithSuspense />}
          />
          <Route
            exact
            path="/profile/:userId?"
            element={<ProfileContainerWithSuspense />}
          />
          <Route exact path="/users" element={<UsersContainerWithSuspense />} />
          <Route exact path="/login" element={<LoginWithSuspense />} />
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
      <BrowserRouter basename="/social-network">
        <AppContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default SamuraiJSApp;
