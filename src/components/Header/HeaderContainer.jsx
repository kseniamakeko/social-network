import React, { useEffect } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getAuthUserData } from "../Redux/AuthReducer.js";

const HeaderContainer = (props) => {
  useEffect(() => {
    props.getAuthUserData();
  }, []);

  return <Header {...props} />;
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
