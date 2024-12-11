import React from "react";
import Header from "./Header.jsx";
import { connect } from "react-redux";
import { logout } from "../Redux/AuthReducer";

const HeaderContainer = (props) => {
  return <Header {...props} />;
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
